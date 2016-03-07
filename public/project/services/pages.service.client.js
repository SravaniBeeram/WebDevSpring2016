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
                    findAllPagesForUser:findAllPagesForUser,
                    deletePageById:deletePageById,
                    updatePageById:updatePageById
        }
        return model;

        function createPageForUser(userId,page,callback){
            var page = {
                _id:(new Date).getTime(),
                title:page.title,
                userId:userId
            };
            pages.push(page);
            callback(page);
        }

        function findAllPagesForUser(userId,callback){
            var userPages = [];
            for(var u in pages) {
                if (pages[u].userId === userId) {
                    userPages.push(pages[u]);
                    console.log(userPages);
                }
            }
            callback(userPages);
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