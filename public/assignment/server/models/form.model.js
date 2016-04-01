var mongoose = require("mongoose");
var q =require("q");

module.exports = function(uuid,db){
    var FormSchema = require("./form.schema.server.js")();
    var form = mongoose.model("form",FormSchema);

    var api = {
        createForm:createForm,
        findFormById:findFormById,
        findAll:findAll,
        findFormsByUserId:findFormsByUserId,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        findFormByTitle:findFormByTitle
    };

    return api;

    function createForm(userid,newForm){
        console.log("create form-model");
        var deferred = q.defer();
        var formObj = {
            "userId": userid,
            "title": newForm.title,
            "fields": [],
            "created": new Date(),
            "updated": new Date()
        };
        console.log("create form:" +formObj);
        form.create(formObj,function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findAll(){
        var deferred = q.defer();
        form.find(function(err,forms){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(forms)
            }
        });
        return deferred.promise;
    }


    function findFormById(formId){
        console.log("find form by id -model");
        return form.findById(formId);
    }


    function findFormsByUserId(userid){
        console.log("find user forms - model");
        var deferred = q.defer();
        form.find({userId:userid},
        function(err,forms){
            if(!err){
                deferred.resolve(forms);
            }else{
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }


    function deleteFormById(formId){
        console.log("delete form - model");
        var deferred = q.defer();
        form.remove({_id:formId},
        function(err,stats){
            if(!err){
                deferred.resolve(stats);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId,newForm){
        console.log("update form - model");
        var deferred = q.defer();
        form.update({_id:formId},{$set:newForm},
        function(err,stats){
            if(!err){
                deferred.resolve(stats);
            }else{
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(formName){
        console.log("find form by title - model");
        var deferred = q.defer();
        form.findOne({title:formName},
        function(err,form){
            if(!err){
                deferred.resolve(form);
            }else{
                deferred.reject(err);
            }
        });
    }
};