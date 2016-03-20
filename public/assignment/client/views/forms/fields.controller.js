(function() {
    "use strict";

    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService,FormService,$routeParams,$rootScope) {
              var vm = this;

        var formId ="000";
        vm.currentField = null;
        vm.fieldEdit=null;
        vm.commitEdit = commitEdit;
        vm.editField = editField;
        vm.deleteField = deleteField;
        vm.addField=addField;

        var currentUser =$rootScope.currentUser;


        vm.options = [
            'Single Line Text Field',
            'Multi Line Text Field',
            'Date Field',
            'Dropdown Field',
            'Checkboxes Field',
            'Radio Buttons Field'
        ];

        if($routeParams.formId){
            formId = $routeParams.formId;
        }

        function init(){

        }init();


        if(currentUser === null){
            $location.url("/home");
        }else{
            displayFields();
        }

        function displayFields(){

            FieldService.findFieldByForm(formId)
                        .then(function(response){
                            vm.fields = response.data;
                        });

            FormService.findFormById(formId)
                .then(function(response){
                    vm.form = response.data;
                })
        }

        function editField(field){
            vm.fieldEdit = field;
            var value = !(vm.fieldEdit.type == "TEXT" || vm.fieldEdit.type == "TEXTAREA" || vm.fieldEdit.type == "EMAIL");

            if(value){
                var optionList = [];
                var op =vm.fieldEdit.options;
                for(var u in op){
                    optionList.push(op[u].label+ ":" +op[u].id)
                }
                vm.optionText = optionList.join("\n");
                console.log(vm.optionText);
            }
        }

        function commitEdit(field){
            vm.fieldEdit = field;
            var value = !(field.type == 'TEXT' || field.type == 'TEXTAREA'|| vm.fieldEdit.type == "EMAIL");

            if(value){
                var optionList =[];
                console.log("optionText" +vm.optionText);
                var op = vm.optionText;
                for(var u in op){
                    var val = op[u].split(":");
                    optionList.push({
                        label:val[0],
                        id:val[1],
                    });
                }
                vm.fieldEdit.options = optionList;
            }
            else{
                console.log("commit edit");
                FieldService.updateField(formId,vm.fieldEdit._id,vm.fieldEdit)
                    .then(displayFields);
                vm.fieldEdit = null;
            }
        }

        function deleteField(field){
            vm.currentField = null;
            FieldService.deleteField(formId,field._id)
                .then(displayFields);
        }

        function addField(fieldType){
            var field;
            switch(fieldType) {
                case "TEXT":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS":
                    field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;

                case "CHECKBOXES":
                    field = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "RADIOS":
                    field = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
            }
            console.log(field);
            FieldService.createField(formId,field)
                .then(displayFields);
        }

    }
})();