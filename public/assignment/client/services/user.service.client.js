(function() {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {
        var model = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            setCurrentUser: setCurrentUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername:findUserByUsername,
            findById:findById
        };

        return model;

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/:id" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/:id" + userId, user);
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username" +username);
        }

        function findById(userId){
            return $http.get("/api/assignment/user/" +userId);
        }
    }
})();