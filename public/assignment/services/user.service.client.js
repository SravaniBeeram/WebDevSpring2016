(function(){
    angular.module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope) {
        var model= {
             users: [
                 {"_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                     "username": "alice", "password": "alice", "roles": ["student"]},

                 {"_id": 234, "firstName": "Bob", "lastName": "Hope",
                     "username": "bob", "password": "bob", "roles": ["admin"]},

                 {"_id": 345, "firstName": "Charlie", "lastName": "Brown",
                     "username": "charlie", "password": "charlie", "roles": ["faculty"]},

                 {"_id": 456, "firstName": "Dan", "lastName": "Craig",
                     "username": "dan", "password": "dan", "roles": ["faculty", "admin"]},

                 {"_id": 567, "firstName": "Edward", "lastName": "Norton",
                     "username": "ed", "password": "ed", "roles": ["student"]}],

                    findUserByCredentials: findUserByCredentials,
                    findAllUsers: findAllUsers,
                    createUser: createUser,
                    deleteUserById: deleteUserById,
                    updateUser:updateUser,
                    setCurrentUser:setCurrentUser,

    };

        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function findUserByCredentials(username, password,callback) {
           var flag = "false";

            for(var u in model.users) {
              if(model.users[u].username === username &&
                 model.users[u].password === password) {
                  flag = "true";
                  callback(model.users[u]);
              }
          }
            if(flag === "false") {
                callback(null);
            }
        }

        function findAllUsers(callback) {
               callback(users);
        }

        function createUser(user, callback) {
             var user = {
                username: user.username,
                 password:user.password,
                 _id:(new Date).getTime(),
                 email:user.email
             };
            model.users.push(user);
             callback(user);
        }

        function deleteUserById(userId, callback) {
            for(var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users.splice(u, 1);
                }
            }
                callback(model.users);
        }

        function updateUser(userId, user, callback) {
            var flag ="false";
            for(var u in model.users) {
                if (model.users[u]._id === userId) {
                    flag = "true";
                    model.users[u] = user;
                    callback(model.users[u]);
                }
            }
            if(flag = "false") {
                callback(null);
            }
        }
    }
})();