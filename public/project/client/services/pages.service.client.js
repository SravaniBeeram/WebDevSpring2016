(function() {
    "use strict";

    angular.module("PageEditorApp")
        .factory("PageService",PageService);

    function PageService($http) {
        var model = {
            createPageForUser: createPageForUser,
            findAllPages: findAllPages,
            deletePageById: deletePageById,
            updatePageById: updatePageById,
            findPageById: findPageById,
            findPageByPageId:findPageByPageId
        };
        return model;

        function createPageForUser(page){
            return $http.post("/api/project/pages" ,page);
        }

        function findAllPages(){
            return $http.get("/api/project/pages");
        }

        function deletePageById(pageId){
            return $http.delete("/api/project/pages/" +pageId);
        }

        function updatePageById(pageId, newPage){
            return $http.put("/api/project/pages/" +pageId ,newPage);
        }

        function findPageById(userId){
            return $http.get("/api/project/pages/" +userId);
        }

        function findPageByPageId(pageId){
            return $http.get("/api/project/page/" +pageId);

        }

    }
})();