var q =require("q");

module.exports = function(page){

    var api = {
        createField : createField,
        deleteField:deleteField,
        updateField:updateField,
        findFieldByPageId:findFieldByPageId,
        findPageFields:findPageFields,
        sortField:sortField,
        getMongooseModel: getMongooseModel
    };

    return api;

    function getMongooseModel(){
        console.log("hello");
        return page;
    }

    function createField(pageId,newField){
        console.log("create - model");
        var deferred = q.defer();
        page.findById(pageId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.fields.push(newField);
                    page.update({_id:pageId},
                        {$set:{
                            fields: doc.fields,
                            updated:new Date()
                        }},
                        function (err,response) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(response);
                            }
                        });
                }
            });

        return deferred.promise;
    }

    function  deleteField(pageId,fieldId){
        var deferred = q.defer();
        page.findById(pageId,
            function (err, response) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var newForm = response;
                    for(var u in newForm.fields){
                        if(newForm.fields[u]._id == fieldId){
                            newForm.fields.splice(u,1);
                            page.update({_id : pageId},
                                {$set:{
                                    fields:newForm.fields,
                                    updated:new Date()
                                }},
                                function (err,doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                });
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function  updateField(pageId,fieldId,field){
        var deferred = q.defer();
        page.findById(pageId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var newForm = doc;
                    for(var u in newForm.fields){
                        if(newForm.fields[u]._id == fieldId){
                            newForm.fields[u] = field;
                            page.update({_id : pageId},
                                {$set: {fields: newForm.fields,
                                    updated:new Date()}},
                                function (err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(field);
                                    }
                                });
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function findFieldByPageId(pageId,fieldId){
        var deferred = q.defer();

        page.findById(pageId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {

                    var fields = doc.fields;
                    for(var u in fields){
                        if(fields[u]._id == fieldId){
                            deferred.resolve(fields[u]);
                        }
                    }
                }
            });
        return deferred.promise;
    }


    function findPageFields(pageId){
        var deferred = q.defer();
        page.findById(pageId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc.fields);
                }
            });

        return deferred.promise;
    }

    function sortField(pageId,startIndex,endIndex){
        var deferred = q.defer();

        page.findById(pageId,
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    var userForm = doc;
                    userForm.fields.splice(endIndex,0,userForm.fields.splice(startIndex,1)[0]);
                    page.update(
                        {"_id":pageId},
                        {$set:{"fields":userForm.fields}},
                        function(err,doc){
                            if(err){
                                deferred.reject(err);
                            } else{
                                console.log("model" +doc);
                                deferred.resolve(doc);
                            }
                        });
                }
            });
        return deferred.promise;
    }
};