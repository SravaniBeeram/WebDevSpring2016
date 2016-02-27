(function() {
    "use strict";
    angular.module("FormBuilderApp")
           .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService,$rootScope) {
         $scope.update = update;

        function update(user) {
            $scope.error = null;
            $scope.message = null;
            var id = $rootScope.currentUser._id;

            UserService.updateUser(id,user,render);

            function render(user){
                if (user) {
                    $scope.message = "User Updated Successfully";
                    UserService.setCurrentUser(user);
                   // console.log(user);
                } else {
                        $scope.message = "Unable to update the user";
                    }
            }
        }
    }
})();