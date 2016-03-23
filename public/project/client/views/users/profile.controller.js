(function() {
    "use strict";
    angular.module("PageEditorApp")
           .controller("ProfileController", ProfileController);

    function ProfileController($scope,UserService,$rootScope) {
        var vm = this;
        vm.update = update;
        var currentUser = $rootScope.currentUser;
        vm.username= currentUser.username;
        vm.password= currentUser.password;
        vm.firstName = currentUser.firstName;
        vm.lastName = currentUser.lastName;
        vm.email = currentUser.email;

        function update(username,password,firstName,lastName,email) {
            $scope.message = null;
            var id = currentUser._id;
            var userDetails ={
                "_id":id,
                "username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "email":email
            };

            UserService.updateUser(id,userDetails)
                .then(function(response){
                    if(response.data)
                    {
                        UserService.setCurrentUser(response.data);
                        $scope.message = "Your Profile has been updated!!!";
                    }else{
                        $scope.message = "Sorry! Please enter your details again!!!";
                    }
                });
        }
    }
})();