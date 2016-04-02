(function() {
    "use strict";
    angular.module("FormBuilderApp")
           .controller("LoginController",LoginController);

    function LoginController(UserService,$rootScope,$location) {
        var vm = this;
        vm.login = login;

        function init(){

        }init();

        function login(user) {
            if(!user){
                vm.message = "Please enter login details";
                return;
            }
            UserService.findUserByCredentials
                 ({username:user.username,
                   password:user.password})
                .then(function(user){
                    if(user.data){
                        UserService.setCurrentUser(user.data);
                        $location.url("/profile");
                    }else{
                        vm.message = "username and/or password doesn't match";
                    }
                    },
                    function(err){
                     console.log(err);
                    }
                );
        }
    }
})();