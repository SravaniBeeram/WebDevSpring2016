(function(){
    angular.module("PageEditorApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope) {
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
            return $http.post("/api/project/login",user);
        }

        function logout() {
            console.log("entered logout controller");
            return $http.post("/api/project/logout");
        }

        function register(user) {
            console.log("register - controller");
            return $http.post("/api/project/register",user);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" +userId);
        }

        function updateUser(userId,user) {
            return $http.put("/api/project/user/" +userId ,user);
        }

        function findById(userId){
            return $http.get("/api/project/user/" +userId);
        }
    }
})();