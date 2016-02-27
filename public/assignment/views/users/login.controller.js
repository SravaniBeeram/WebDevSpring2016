(function() {
    "use strict";
    angular.module("FormBuilderApp")
           .controller("LoginController",LoginController);

    function LoginController($scope, UserService,$rootScope,$location) {
        $scope.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password,render);

            function render(user) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();