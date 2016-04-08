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
         vm.phones = loggedUser.phones.join(",");
         vm.emails = loggedUser.emails.join(",");



        function init(){

        }init();

        function update(username,password,firstName,lastName,phones,emails) {
            vm.message = null;
            var id = loggedUser._id;
            console.log(emails);
            var userDetails={
                "username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "roles":loggedUser.roles,
                "phones":phones.split(","),
                "emails":emails.split(",")
            };
            UserService.updateUser(id,userDetails)
                .then(function(user){
                    $rootScope.currentUser = user.data;
                        vm.message = "Your Profile has been updated!!!";
                    },
                    function(err){
                        vm.message = "Sorry! Please enter your details again!!!";
                    }
                );
        }
    }
})();