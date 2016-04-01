(function(){
    "use strict";

    angular.module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,$rootScope){

        var vm = this;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        vm.forms = [];
        var currentUser = $rootScope.currentUser;
        vm.form = null;


        function init(){
            console.log("display -forms controller");
            FormService.findAllFormsForUser(currentUser._id)
                .then(function(userForms){
                    vm.forms = userForms.data;
                },function(err){
                    console.log(err);
                });
        }init();

        function addForm(form){
            if(form.formName != null){
                console.log("add form - controller");
                console.log(form);
                var newForm = {"title": form.formName};
                FormService.createFormForUser(currentUser._id,newForm)
                    .then(init(),function(err){
                        console.log(err);
                    });
                vm.form.formName = null;
            }else{
                vm.alertMessage = "Please enter a name for the form";
            }
        }

        function updateForm(form){
            if(form.formName != null){
                console.log("update form - controller");
                var updatedForm = {
                    "title":form.formName,
                    "updated":new Date()
                };
                FormService.updateFormById(vm.form._id,updatedForm)
                    .then(init(),function(err){
                        console.log(err);
                    });
                vm.form.formName = null;
            }else{
                vm.alertMessage = "Please select a form to update";
            }
        }

        function deleteForm(index){
            console.log("delete form - controller");
              FormService.deleteFormById(vm.forms[index]._id)
                  .then(init(),function(err){
                      console.log(err);
                  });
        }

        function selectForm(index){
            console.log("select form - controller");
            vm.form = vm.forms[index];
            vm.form.formName = vm.forms[index].title;
        }
    }
})();