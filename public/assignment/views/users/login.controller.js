(function()
{
    "use strict";

    angular.module("FormBuilderApp")
           .controller("LoginController",LoginController);

    function LoginController($scope, UserService,$rootScope,$location)
    {
        $scope.login = login;

        function login(user)
        {
            var user = UserService.findUserByCredentials(user.username, user.password);
            if(user)
            {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }

        }
    }
})();