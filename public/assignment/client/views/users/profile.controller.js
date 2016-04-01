(function() {
    "use strict";
    angular.module("FormBuilderApp")
           .controller("ProfileController", ProfileController);

    function ProfileController(UserService,$rootScope) {
         var vm = this;
         vm.update = update;
         var loggedUser = $rootScope.currentUser;
         vm.username= loggedUser.username;
         vm.password= loggedUser.password;
         vm.firstName = loggedUser.firstName;
         vm.lastName = loggedUser.lastName;
         vm.emails = loggedUser.emails;

        function init(){

        }init();

        function update(username,password,firstName,lastName,emails) {
            vm.message = null;
            var id = loggedUser._id;
            var userDetails={
                "username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "emails":emails
            };
            UserService.updateUser(id,userDetails)
                .then(function(user){
                        UserService.setCurrentUser(user.data);
                        vm.message = "Your Profile has been updated!!!";
                    },
                    function(err){
                        vm.message = "Sorry! Please enter your details again!!!";
                    }
                );
        }
    }
})();