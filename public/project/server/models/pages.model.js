var mock = require("./pages.mock.json");

module.exports = function (uuid) {
    var api = {
        findPagesForUser: findPagesForUser,
        createPageForUser: createPageForUser,
        findAllPages: findAllPages,
        deletePageById: deletePageById,
        updatePageById: updatePageById,
        findPageById:findPageById
    };

    return api;


    function findPageById(pageId){
        for(var u in mock){
            if(mock[u]._id == pageId){
                return mock[u];
            }
        }
        return null;
    }

    function findPagesForUser(userId)
    {
        var userPages = [];
        for (var u in mock) {
            if (mock[u].userId == userId) {
                userPages.push(mock[u]);
            }
        }
        return userPages;
    }

    function createPageForUser(page) {
        var newPage = {
            _id:uuid.v1(),
            title: page.title,
            userId:page.userId
        };
        mock.push(newPage);
    }

    function findAllPages() {
        return (mock);
    }

    function deletePageById(pageId) {
        for (var u in mock)
        {
            if (mock[u]._id === pageId)
            {
                mock.splice(u, 1);
                break;
            }
        }
        return (mock);
    }

    function updatePageById(pageId, newPage) {
        for (var u in mock)
        {
            if (mock[u]._id === pageId)
            {
                mock[u].title = newPage.title;
                mock[u].userId = newPage.userId;
                break;
            }
        }
        return (mock[u]);
    }
};
