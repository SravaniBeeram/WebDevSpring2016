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
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }else{
                        vm.message = "Username or password doesnot match";
                    }
                });
        }
    }
})();