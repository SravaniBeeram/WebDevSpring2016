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
                        UserService.setCurrentUser(user.data);
                        $location.url("/profile");
                    },
                    function(err){
                        vm.message = "Username or password doesnot match";
                    }
                );
        }
    }
})();