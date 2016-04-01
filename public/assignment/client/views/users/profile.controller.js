(function() {
    "use strict";
    angular.module("FormBuilderApp")
           .controller("ProfileController", ProfileController);

    function ProfileController(UserService,$rootScope) {
         var vm = this;
         vm.update = update;
         var currentUser = $rootScope.currentUser;
         vm.username= currentUser.username;
         vm.password= currentUser.password;
         vm.firstName = currentUser.firstName;
         vm.lastName = currentUser.lastName;
         vm.emails = currentUser.emails;

        function init(){

        }init();

        function update(username,password,firstName,lastName,emails) {
            vm.message = null;
            var id = currentUser._id;
            var userDetails={
                "_id":id,
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