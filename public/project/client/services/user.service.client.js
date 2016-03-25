(function(){
    angular.module("PageEditorApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope) {
        var model = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            findUserByUsername:findUserByUsername,
            findById:findById
        };

        return model;

        function findUserByCredentials(credentials) {
            return $http.get("/api/project/user/" +credentials.username+ "/" +credentials.password);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" +userId);
        }

        function updateUser(userId,user) {
            return $http.put("/api/project/user/" +userId ,user);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/username/" +username);
        }

        function findById(userId){
            return $http.get("/api/project/user/" +userId);
        }
    }
})();