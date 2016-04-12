(function(){
    "use strict";
     angular.module("PageEditorApp")
            .controller("SignUpController", SignUpController);

    function SignUpController($location,UserService,$rootScope) {
        var vm = this;
        vm.signUp = signUp;


        function init(){

        }init();

        function signUp(user) {
            vm.message = null;

            if(user == null) {
                  vm.message = "Please fill in the required details";
                  return;
              }

              if(!user.username) {
                  vm.message = "Please provide a username";
                  return;
              }

              if (!user.password || !user.password2) {
                  vm.message = "Please provide a password";
                  return;
              }

              if (user.password !== user.password2) {
                  vm.message = "Passwords must match";
                  return;
              }

              if(!user.emails) {
                  vm.message = "Please provide an email";
                  return;
              }

            var newUser ={
                "username":user.username,
                "password":user.password,
                "emails":user.emails.split(",")
            };

            UserService.register(newUser)
                .then(function(response) {
                        if(response.data != null){
                            $rootScope.currentUser = user;
                            console.log(user);
                            $location.url("/profile");
                        }else{
                            vm.message = "username already exists"
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                );
          }
    }
})();