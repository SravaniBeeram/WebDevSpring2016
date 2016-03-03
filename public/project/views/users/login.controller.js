(function() {
    "use strict";
    angular.module("PageEditorApp")
           .controller("LoginController",LoginController);

    function LoginController($scope, UserService,$rootScope,$location) {
        $scope.login = login;
        $scope.message = null;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password,render);

            function render(user) {
                if(user){
                    $rootScope.currentUser = user;
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                } else {
                $scope.message = "Username or password doesnot match";
                }
            }
        }
    }
})();