(function() {
    "use strict";

    angular.module("FormBuilderApp")
           .factory("FormService",FormService);

    function FormService($http) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById:findFormById
        };

        return api;

        function createFormForUser(userId,newForm) {
            return $http.post("/api/assignment/user/" +userId+ "/form",newForm);
        }

        function findAllFormsForUser (userId) {
            return $http.get("/api/assignment/userForms/" +userId+ "/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" +formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" +formId, newForm);
        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/" +formId);
        }
    }
})();
