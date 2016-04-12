var mongoose = require("mongoose");
var q =require("q");

module.exports = function (app,db) {
    var PageSchema = require("./page.schema.server.js")();
    var page = mongoose.model("page",PageSchema);
    var fieldModel = require("./fields.model.js")(page);
    var fieldService = require("../services/fields.service.server.js")(app,fieldModel);

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
        return page.findById(pageId);
    }

    function findPagesForUser(userId){
    var deferred = q.defer();
    page.find({userId:userId},
        function(err,pages){
            if(!err){
                deferred.resolve(pages);
            }else{
                deferred.reject(err);
            }
        });
    return deferred.promise;
}

    function createPageForUser(newPage) {
        var deferred = q.defer();
        var pageObj = {
            "userId": newPage.userId,
            "title": newPage.title,
            "fields": [],
            "created": new Date(),
            "updated": new Date()
        };
        page.create(pageObj,function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllPages() {
        return page.find();
    }

    function deletePageById(pageId) {
        var deferred = q.defer();
        page.remove({_id:pageId},
            function(err,stats){
                if(!err){
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }


    function updatePageById(pageId, newPage) {
        var deferred = q.defer();
        page.update({_id:pageId},{$set:newPage},
            function(err,stats){
                if(!err){
                    deferred.resolve(stats);
                }else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }
};
