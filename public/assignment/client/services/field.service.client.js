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
            updateField:updateField,
            sortField:sortField
        };

        return api;

        function sortField(formId,startIndex,endIndex){
            return $http.put("/api/assignment/"+formId+"/field?startIndex="+startIndex+"&endIndex="+endIndex);
        }

        function createField (formId, field) {
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