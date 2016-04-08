(function() {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var model = {
            login:login,
            logout:logout,
            register:register,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findById:findById
        };

        return model;

        function login(user) {
            return $http.post("/api/assignment/login",user);
        }

        function logout() {
            console.log("entered logout controller");
            return $http.post("/api/assignment/logout");
        }

        function register(user) {
            console.log("register - controller");
            return $http.post("/api/assignment/register",user);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" +userId);
        }

        function updateUser(userId,user) {
            return $http.put("/api/assignment/user/" +userId ,user);
        }

        function findById(userId){
            return $http.get("/api/assignment/user/" +userId);
        }
    }
})();