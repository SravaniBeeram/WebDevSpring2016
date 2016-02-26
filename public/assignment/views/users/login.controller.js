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
            console.log("entered login js");
            var user = UserService.findUserByCredentials({username:user.username, password:user.password});
            if(user)
            {
                $rootScope.currentUser = user;
                console.log(user.username);
                $location.url("/profile");
            }

        }
    }
})();