(function() {
    "use strict";

    angular.module("PageEditorApp")
        .controller("PageDetailsController",PageDetailsController);

    function PageDetailsController(FieldService,PageService,$routeParams,$rootScope,$sce) {
        var vm = this;

        vm.$sce = $sce;

        var pageId;
        vm.currentField = null;
        vm.fieldEdit=null;
        vm.commitEdit = commitEdit;
        vm.editField = editField;
        vm.deleteField = deleteField;
        vm.addField=addField;
        vm.cloneField = cloneField;
        vm.sortField = sortField;
        vm.trustAsHtml= trustAsHtml;
        vm.safeYouTubeUrl = safeYouTubeUrl;
        vm.ShowHide = ShowHide;
        vm.getButtonClass=getButtonClass;
        vm.IsHidden = true;

        var currentUser =$rootScope.currentUser;


        if($routeParams.pageId){
            pageId = $routeParams.pageId;
        }

        function trustAsHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function safeYouTubeUrl(field) {
            if(field && field.youTube) {
                var urlParts = field.youTube.url.split("/");
                var youTubeId = urlParts[urlParts.length-1];
                return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+youTubeId);
            }
            return "";
        }

        function ShowHide(){
            console.log(vm.IsHidden);
            vm.IsHidden = vm.IsHidden? false : true;
            console.log(vm.IsHidden);
        }

        function getButtonClass(style){
            console.log("button class");
            if(!style){
                style = "default";
            }
            return "btn-"+style.toLowerCase();
        }

        function updatePage(start,end){
            var newFields = [];

            for(var i in vm.fields){
                newFields[i] = vm.fields[i];
            }

            var temp = newFields[start];
            newFields[start] = newFields[end];
            newFields[end] = temp;

            PageService.findPageByPageId(pageId)
                .then(function(response){
                    var page = response.data;
                    page.fields = newFields;
                    console.log("after drag:" +page.fields);
                    PageService.updatePageById(page._id,page);
                },function(err){
                    console.log(err);
                });
        }


        function init(){

            FieldService.findPageFields(pageId)
                .then(function(response){
                    vm.fields = response.data;
                },function(err){
                    console.log(err);
                });

            PageService.findPageByPageId(pageId)
                .then(function(response){
                    vm.page = response.data;
                },function(err){
                    console.log(err);
                });

            PageService.findPageById($rootScope.currentUser._id)
                .then(function(response)
                {
                    vm.pages = response.data;
                },function(err){
                    console.log(err);
                });

        }init();

        function editField(field){
            vm.fieldEdit = field;
            vm.label = field.label;
            var optionsString = "";
            var op =field.options;

            if(op){
                var optionList = [];
                for(var u in op){
                    optionList.push(op[u].label+ ":" +op[u].value+ "\n")
                    optionsString = optionsString + (op[u].label + ":" + op[u].value + "\n");
                }
                vm.fieldEdit.options = optionList;
                optionsString = optionsString.substring(0, optionsString.length - 1);
                vm.options = optionsString;
            }
            if(field.placeholder){
                vm.placeholder = field.placeholder;
            }
        }

        function commitEdit(){
            if(vm.options != null){
                var opt = vm.options.split("\n");
                var optionList =[];

                for(var u in opt){
                    var val = opt[u].split(":");
                    optionList.push({"label":val[0],"value":val[1]});
                }
                vm.fieldEdit.options = optionList;
            }

            if(vm.placeholder)
            {
                vm.fieldEdit.placeholder  = vm.placeholder;
            }

            vm.fieldEdit.label = vm.label;

            if(vm.textArea != null){
                vm.fieldEdit.textArea = vm.textArea;
            }


            if(vm.html != null){
                vm.fieldEdit.html.text = vm.html.text;
            }

            if(vm.image != null){
                vm.fieldEdit.image= vm.image;
            }

            console.log(vm.youTube);

            if(vm.youTube != null){
                vm.fieldEdit.youTube= vm.youTube;
            }

            if(vm.Button != null){
                vm.fieldEdit.Button = vm.Button;
            }

            FieldService.updateField(pageId,vm.fieldEdit._id,vm.fieldEdit)
                .then(init());
            vm.label = null;
            vm.placeholder = null;
            vm.options = null;
            vm.textArea = null;
            vm.html = null;
            vm.image = null;
            vm.youTube = null;
            vm.Button = null;
        }

        function deleteField(fieldId){
            FieldService.deleteField(pageId,fieldId)
                .then(init());
        }

        function addField(fieldType){
            var field;
            switch(fieldType) {
                case "LABEL":
                    field = {"label": "New Label", "type": "LABEL"};
                    break;

                case "HEADER":
                    field = {"label": "New Header", "type": "HEADER","header":null};
                    break;

                case "PARAGRAPH":
                    field = {"label": "New Header", "type": "PARAGRAPH","placeholder":"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"};
                    break;

                case "TEXT":
                    field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;

                case "LINK":
                    field = {"label": "New Link Field", "type": "LINK", "link": null};
                    break;

                case "HTML":
                    field = {"label": "New HTML Field", "type": "HTML", "html": null};
                    break;

                case "IMAGE":
                    field = {"label": "New Image", "type": "IMAGE", "image": null};
                    break;

                case "YOUTUBE":
                    field = {"label": "New Youtube Video" , "type":"YOUTUBE","youTube": null};
                    break;

                case "TEXTAREA":
                    field = {"label": "New Text Field", "type": "TEXTAREA", "textArea":{"rows": 2,"placeholder":"New Text Area"}};
                    break;

                case "DATE":
                    field = {"label": "New Date Field", "type": "DATE"};
                    break;

                case "BUTTON":
                    field = {"label": "New Button Field" , "type":"BUTTON","Button": null};
                    break;

                case "LIST":
                    field = {
                        "label": "New List", "type": "LIST", "options":[
                            {"label": "Item 1", "value": "Item_1"},
                            {"label": "Item 2", "value": "Item_2"},
                            {"label": "Item 3", "value": "Item_3"}
                        ]
                    };
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
            console.log(field);
            FieldService.createField(pageId,field)
                .then(init());
        }

        function sortField(start,end){
            FieldService
                .sortField(pageId,start,end)
                .then(function(response){
                        vm.fields= response.data;
                    },
                    function(err){
                        console.log(err);
                    });
        }

        function cloneField(field){
            FieldService.createField(pageId,field)
                .then(init());
        }
    }

})();