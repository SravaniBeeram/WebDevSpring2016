(function() {
    "use strict";

    angular.module("PageEditorApp")
        .factory("PageService",PageService);

    function PageService() {
        var pages = [
            {"_id": "000", "title": "Page-1", "userId": 123},
            {"_id": "010", "title": "Page-2", "userId": 123},
            {"_id": "020", "title": "Page-1", "userId": 234}]

        var model={ createPageForUser:createPageForUser,
                    findAllPages:findAllPages,
                    deletePageById:deletePageById,
                    updatePageById:updatePageById
        }
        return model;

        function createPageForUser(page){
            var page = {
                _id:(new Date).getTime(),
                title:page.title,
            };
            pages.push(page);
        }

        function findAllPages(callback){
            callback(pages);
        }

        function deletePageById(pageId,callback){
            for(var u in pages) {
                if (pages[u]._id === pageId) {
                    pages.splice(u, 1);
                    break;
                }
            }
            callback(pages);
        }

        function updatePageById(pageId, newPage, callback){
            for(var u in pages) {
                if (pages[u]._id === pageId) {
                    pages[u].title  = newPage.title;
                    pages[u].userId = newPage.userId;
                    break;
                }
            }
            callback(pages[u]);
        }
    }
})();