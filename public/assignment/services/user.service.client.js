(function(){
    angular.module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope)
    {

        var model= {
             users: [
                 {
                     "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                     "username": "alice", "password": "alice", "roles": ["student"]
                 },
                 {
                     "_id": 234, "firstName": "Bob", "lastName": "Hope",
                     "username": "bob", "password": "bob", "roles": ["admin"]
                 },
                 {
                     "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                     "username": "charlie", "password": "charlie", "roles": ["faculty"]
                 },
                 {
                     "_id": 456, "firstName": "Dan", "lastName": "Craig",
                     "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                 },
                 {
                     "_id": 567, "firstName": "Edward", "lastName": "Norton",
                     "username": "ed", "password": "ed", "roles": ["student"]
                 }],

                    findUserByCredentials: findUserByCredentials,
                    findAllUsers: findAllUsers,
                    createUser: createUser,
                    deleteUserById: deleteUserById,
                    updateUser:updateUser,
                    setCurrentUser:setCurrentUser,
                    findUserByUsername:findUserByUsername

    };

        return model;

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function setCurrentUser (user)
        {
            $rootScope.currentUser = user;
        }

        function findUserByCredentials(username, password,callback)
        {
            for(var u in model.users)
          {
              if(model.users[u].username === username &&
                 model.users[u].password === password)
              {
                  return(model.users[u]);
              }
          }
            return(null);
        }

        function findAllUsers(callback)
        {

        }

        function createUser(user, callback)
        {
             var user = {
                username: user.username,
                 password:user.password
             }
            model.users.push(user);
            return user;
        }

        function deleteUserById(userId, callback)
        {

        }

        function updateUser(userId, user, callback)
        {
           for(var u in model.users)
           {
               if(model.users[u]._id === userId)
               {
                   user.firstName = user.firstName;
                   user.lastName = user.lastName;
                   user.password = user.password;
                   callback(user);
               }
               else
               {
                   callback(null);
               }
           }
        }
    }
})()