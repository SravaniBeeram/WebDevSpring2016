var q =require("q");

module.exports = function(form){

    var api = {
        createField : createField,
        deleteField:deleteField,
        updateField:updateField,
        findField:findField,
        findAllFieldsForForm:findAllFieldsForForm
    };

    return api;

    function createField(formId,newField){
        console.log("create - server");
        var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var newForm = doc;
                    newForm.fields.push(newField);
                    form.update(
                        { _id : formId},
                        { $set: newForm},
                        function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(newForm);
                            }
                        });

                }
            });

        return deferred.promise;
    }

    function  deleteField(formId,fieldId){
        var deferred = q.defer();
            form.findById(formId,
                function (err, response) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var newForm = response;
                        for(var i in newForm.fields){
                            if(newForm.fields[i]._id == fieldId){
                                newForm.fields.splice(i,1);
                                form.update(
                                    { _id : formId},
                                    { $set: newForm},
                                    function (err, response) {
                                        if (err) {
                                            deferred.reject(err);
                                        } else {
                                            deferred.resolve(response);
                                        }
                                    });
                            }
                        }
                    }
                });
        return deferred.promise;
    }

    function  updateField(formId,fieldId,field){
        var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var newForm = doc;
                    for(var i in newForm.fields){
                        if(newForm.fields[i]._id == fieldId){
                            newForm.fields[i] = field;
                            form.update(
                                { _id : formId},
                                { $set: newForm},
                                function (err, doc) {
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

    function findField(formId,fieldId){
        var deferred = q.defer();

        form.findById(formId,
            function (err, response) {
                if (err) {
                    deferred.reject(err);
                } else {

                    var fields = response.fields;
                    for(var i in fields){
                        if(fields[i]._id == fieldId){
                            deferred.resolve(fields[i]);
                        }
                    }
                }
            });
        return deferred.promise;
    }


    function findAllFieldsForForm(formId){
        var deferred = q.defer();
        form.findById(formId,
            function (err, response) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(response.fields);
                }
            });

        return deferred.promise;
    }

};