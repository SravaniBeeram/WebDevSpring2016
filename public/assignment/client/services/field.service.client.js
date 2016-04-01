(function(){
    "use strict";
    angular.module("FormBuilderApp")
           .factory("FieldService",FieldService);

    function FieldService($http){

        var api = {
            createField:createField,
            findField:findField,
            findFieldByForm:findFieldByForm,
            deleteField:deleteField,
            updateField:updateField
        };

        return api;

        function createField (formId, field) {
            console.log("client" +formId);
            return $http.post("/api/assignment/form/" +formId+ "/field", field);
        }

        function findField (formId, fieldId) {
            return $http.get("/api/assignment/form/" +formId+ "/field/" + fieldId);
        }

        function findFieldByForm (formId) {
            return $http.get("/api/assignment/form/" +formId+ "/field")
        }

        function deleteField (formId, fieldId) {
            return $http.delete("/api/assignment/form/" +formId+ "/field/" +fieldId);
        }

        function updateField (formId, fieldId, field) {
            return $http.put("/api/assignment/form/" +formId+ "/field/" + fieldId, field);
        }

    }
})();