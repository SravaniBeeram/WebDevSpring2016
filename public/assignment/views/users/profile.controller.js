(function() {
    "use strict";
    angular.module("FormBuilderApp")
           .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService,$rootScope,$location)
    {
         $scope.update = update;

        function update(user)
        {
            var user = UserService.findUserByCredentials(user.username, user.password);

        }
    }
})();