(function(){
    "use strict";
     angular.module("FormBuilderApp")
            .controller("RegisterController", RegisterController);

    function RegisterController($location,UserService)
    {
          function register()
          {
              console.log("hello");
          }

    }

    }
)()