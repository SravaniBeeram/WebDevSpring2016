(function() {
    "use strict";

    angular.module("FormBuilderApp")
           .controller("FormController",FormController);

    function FormController($scope,FormService,$rootScope) {

        var vm =this;
        vm.addForm = addForm;
        vm.updateForm=updateForm;
        vm.deleteForm=deleteForm;
        vm.selectForm=selectForm;

        var formIndexSelected;
        var currentUserForms = [];
        var currentUser =$rootScope.currentUser;

        function init(){
            console.log("forms.controller.js");
            FormService.findAllFormsForUser(currentUser._id)
                       .then(renderForms);
        }init();


        function renderForms(response){
            console.log("response data" +response.data);
            if(response.data){
                vm.forms = response.data;
                currentUserForms=response.data;
            }
        }

        function addForm(formName) {
            if (formName != null) {
                FormService.createFormForUser(currentUser._id, formName)
                    .then(renderAddForm);
            }else{
                $scope.alertMessage = "Please enter a name for the form";
            }
        }

        function renderAddForm(response){
            $scope.formName = null;
            currentUserForms.push(response.data);
            $scope.forms = currentUserForms;
        }

        function updateForm(formName) {
            if (formName != null) {
                var formSelected = currentUserForms[formIndexSelected];
                formSelected.title = formName;
                FormService.updateFormById(formSelected._id, formSelected)
                    .then(renderFormAfterAction);
                $scope.formName = null;
            }else {
                $scope.alertMessage = "Please Select a form to update";
            }
        }

        function renderFormAfterAction(response){
            if(response.data) {
                FormService.findAllFormsForUser(currentUser._id)
                    .then(renderForms);
            }
        }

        function deleteForm(index){
              formIndexSelected = index;
              FormService.deleteFormById(currentUserForms[index]._id)
                  .then(renderFormAfterAction)
        }


        function selectForm(index){
            formIndexSelected = index;
            $scope.formName = currentUserForms[index].title;
        }
    }

})();
