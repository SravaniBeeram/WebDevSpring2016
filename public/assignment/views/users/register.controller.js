(function(){
    "use strict";
     angular.module("FormBuilderApp")
            .controller("RegisterController", RegisterController);

    function RegisterController($scope,$location)
    {
        $scope.register = register;
          function register()
          {
              $location.path("views/users/profile.view.html");
          }
    }
    }
)()