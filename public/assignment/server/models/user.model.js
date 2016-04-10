var mongoose = require("mongoose");
var q = require("q");

module.exports = function (db) {
    var UserSchema = require("./user.schema.server.js")();
    var user = mongoose.model("user", UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findById: findById,
        updateUser: updateUser,
        deleteUserById:deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function createUser(newUser) {
        var deferred = q.defer();
        user.create(newUser,function(err,doc) {
           if(err){
               deferred.reject(err);
           } else{
               deferred.resolve(doc);
           }
        });
        return deferred.promise;
    }

    function findAllUsers() {
       var deferred = q.defer();
        user.find(function(err,users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findById(userid) {
        return user.findById(userid);
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        user.findOne({username:username},
            function (err,user) {
                if(!err){
                    deferred.resolve(user);
                }else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId,newuser) {
        var deferred = q.defer();
        delete newuser._id;
        user.update({_id:userId},
                    {$set:newuser},
        function(err,stats){
            if(!err){
                deferred.resolve(newuser);
            }else{
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        user.remove({_id:userId},
        function(err,stats){
            if(!err){
                deferred.resolve(stats);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        user.findOne({
            username: credentials.username,
            password: credentials.password},
            function (err,user) {
                if(!err){
                    deferred.resolve(user);
                }else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }
};