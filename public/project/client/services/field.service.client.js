(function(){
    "use strict";
    angular.module("PageEditorApp")
        .factory("FieldService",FieldService);

    function FieldService($http){

        var api = {
            createField:createField,
            findField:findField,
            findFieldByPage:findFieldByPage,
            deleteField:deleteField,
            updateField:updateField
        };

        return api;

        function createField (pageId, field) {
            return $http.post("/api/project/page/" +pageId+ "/field", field);
        }

        function findField (pageId, fieldId) {
            return $http.get("/api/project/page/" +pageId+ "/field/" + fieldId);
        }

        function findFieldByPage (pageId) {
            return $http.get("/api/project/page/" +pageId+ "/field")
        }

        function deleteField (pageId, fieldId) {
            return $http.delete("/api/project/page/" +pageId+ "/field/" +fieldId);
        }

        function updateField (pageId, fieldId, field) {
            return $http.put("/api/project/page/" +pageId+ "/field/" + fieldId, field);
        }

    }
})();