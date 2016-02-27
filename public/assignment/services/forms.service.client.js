(function() {
    "use strict";

    angular.module("FormBuilderApp")
           .factory("FormService",FormService);

    function FormService() {
        var model = {
            forms:[
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}],

            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
    };
     return model;

        function createFormForUser(userId,form,callback){
            var form = {
                _id:(new Date).getTime(),
                 userId:userId
        };
            model.forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId,callback){
            var flag ="false";
            for(var u in model.forms) {
                if (model.forms[u].userId === userId) {
                    flag = "true";
                    callback(model.forms[u]);
                }
            }
            if(flag === "false") {
                callback(null);
            }
        }

        function deleteFormById(formId,callback){
            var flag ="false";
            for(var u in model.forms) {
                if (model.forms[u]._id === formId) {
                    flag = "true";
                    model.forms.splice(u, 1);
                    callback(model.forms);
                }
            }
            if(flag === "false"){
                callback(null);
            }
        }

        function updateFormById(formId, newForm, callback){
            var flag = "false";
            for(var u in model.forms) {
                if (model.forms[u]._id === formId) {
                    flag = "true";
                    model.forms[u].title = newForm.title;
                    callback(model.forms[u]);
                }
            }
            if(flag == "false") {
                callback(null);
            }

        }

    }
})();