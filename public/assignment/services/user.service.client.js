(function(){
    angular.module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootscope)
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
                 }
                 ],

                    findUserByUsernameAndPassword: findUserByCredentials,
                    findAllUsers: findAllUsers,
                    createUser: createUser,
                    deleteUserById: deleteUserById,
                    updateUser:updateUser
                  };

         return model;

        function findUserByCredentials(username, password, callback)
        {
          for(var u in model.users)
          {
              if(model.users[u].username === username &&
                 model.users[u].password === password)
                 callback(model.users[u]);
          }
        }

        function findAllUsers(callback)
        {

        }

        function createUser(user, callback)
        {
             var user = {
                username: user.username,
                 password:user.password,
                 firstName:user.firstName,
                 lastName:user.lastName
             }
            model.users.push(user)
                .success(callback);
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