(function() {
    "use strict";
    angular
        .module("PageEditorApp")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/signup", {
                templateUrl: "views/users/signup.view.html",
                controller:"SignUpController"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController"
            })

            .otherwise({
                redirectTo:"home"
            })
    }
})();