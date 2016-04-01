(function() {
    "use strict";

    angular.module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FieldService,FormService,$routeParams,$rootScope,$scope) {
        var vm = this;

        var formId;
        vm.currentField = null;
        vm.fieldEdit=null;
        vm.commitEdit = commitEdit;
        vm.editField = editField;
        vm.deleteField = deleteField;
        vm.addField=addField;
        vm.repeatField = repeatField;
        $scope.updateForm = updateForm;

        var currentUser =$rootScope.currentUser;

        if($routeParams.formId){
            formId = $routeParams.formId;
            console.log(formId);
        }

        function updateForm(start,end){
            var newFields = [];

            for(var i in vm.fields){
                newFields[i] = vm.fields[i];
            }

            var temp = newFields[start];
            newFields[start] = newFields[end];
            newFields[end] = temp;

            FormService.findFormById(formId)
                .then(function(response){
                    var form = response.data;
                    form.fields = newFields;
                    FormService.updateFormById(form._id,form);
                },function(err){
                    console.log(err);
                });
        }

        function init(){

            FieldService.findFieldByForm(formId)
                .then(function(response){
                    vm.fields = response.data;
                },
                    function(err){
                    console.log(err);
                });

            FormService.findFormById(formId)
                .then(function(response){
                    vm.form = response.data;
                },
                function(err){
                    console.log(err);
                })

        }init();

        function editField(field){
            vm.fieldEdit = field;
            vm.label = field.label;

            var op =field.options;

            if(op){
                var optionList = [];
                for(var u in op){
                    optionList.push(op[u].label+ ":" +op[u].value+ "\n")
                }
                vm.fieldEdit.options = optionList;
            }
            if(field.placeholder){
                vm.placeholder = field.placeholder;
            }
        }

        function commitEdit(){
            console.log("commit edit");
            if(vm.options != null){
                var opt = vm.options.split("\n");
                var optionList =[];

                for(var u in opt){
                    var val = opt[u].split(":");
                    optionList.push({"label":val[0],"value":val[1]});
                }
                vm.fieldEdit.options = optionList;
                console.log(vm.options);
            }

            if(vm.fieldEdit.placeholder){
                vm.fieldEdit.placeholder  = vm.placeholder
            }

            vm.fieldEdit.label = vm.label;

            FieldService.updateField(formId,vm.fieldEdit._id,vm.fieldEdit)
                    .then(init(),function(err){
                        console.log(err);
                    });
            vm.label = null;
            vm.placeholder = null;
            vm.options = null;
        }

        function deleteField(fieldId){
            FieldService.deleteField(formId,fieldId)
                .then(init(),function(err){
                    console.log(err);
                });
        }

        function addField(fieldType){
            var field;
            switch(fieldType) {
                case "TEXT":
                    field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    field = {"label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS":
                    field = {
                        "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;

                case "CHECKBOXES":
                    field = {
                        "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "RADIOS":
                    field = {
                        "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
            }
            console.log("type:" +fieldType);
            console.log(field);
            FieldService.createField(formId,field)
                .then(init(),function(err){
                    console.log(err);
                });
        }

        function repeatField(field){
            console.log(field);
            FieldService.createField(formId,field)
                .then(init(),function(err){
                console.log(err);
            });
        }

    }
})();