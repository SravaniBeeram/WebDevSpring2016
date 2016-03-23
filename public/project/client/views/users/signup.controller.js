(function(){
    "use strict";
     angular.module("PageEditorApp")
            .controller("SignUpController", SignUpController);

    function SignUpController($scope,$location,UserService) {
        var vm = this;
        vm.signUp = signUp;


        function init(){

        }init();

        function signUp(user) {
            $scope.message = null;

            if(user == null) {
                  $scope.message = "Please fill in the required details";
                  return;
              }

              if(!user.username) {
                  $scope.message = "Please provide a username";
                  return;
              }

              if (!user.password || !user.password2) {
                  $scope.message = "Please provide a password";
                  return;
              }

              if (user.password !== user.password2) {
                  $scope.message = "Passwords must match";
                  return;
              }

              if(!user.email) {
                  $scope.message = "Please provide an email";
                  return;
              }

              UserService.createUser(user)
                  .then(function(response){
                      if(response.data){
                          UserService.setCurrentUser(response.data);
                          $location.url("/profile");
                      }else{
                          $scope.message = "Please try again"
                      }
                  });
          }
    }
})();