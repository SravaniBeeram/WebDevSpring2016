(function() {
    "use strict";

    angular.module("FormBuilderApp")
           .controller("FormController",FormController);

    function FormController(FormService,$rootScope,$location) {

        var vm = this;
        vm.addForm = addForm;
        vm.updateForm=updateForm;
        vm.deleteForm=deleteForm;
        vm.selectForm=selectForm;
        vm.displayForms=displayForms;

        vm.forms = [];
        var currentUser =$rootScope.currentUser;
        vm.form = null;


        function init(){
        }init();


        if(currentUser === null){
            $location.url("/home");
        }
        else{
            displayForms();
        }

        function displayForms(){
            FormService.findAllFormsForUser(currentUser._id)
                .then(renderForms);
            vm.form = null;
        }

        function renderForms(response){
            if(response.data){
                vm.forms = response.data;
            }
        }

        function addForm(form) {
            if (form.title != null) {
                FormService.createFormForUser(currentUser._id, form)
                           .then(displayForms);
            }else{
                vm.alertMessage = "Please enter a name for the form";
            }
        }

        function updateForm(form) {
            if (form.title != null) {
                FormService.updateFormById(form._id, form)
                           .then(displayForms);
            }else {
                vm.alertMessage = "Please Select a form to update";
            }
        }

        function deleteForm(form){
              FormService.deleteFormById(form._id)
                         .then(displayForms);
        }

        function selectForm(index){
            vm.form = vm.forms[index];
        }
    }

})();