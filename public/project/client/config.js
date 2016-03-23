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
                controller:"SignUpController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController",
                controllerAs: "model"
            })

            .when("/pages" , {
                templateUrl:"views/pages/pages.view.html",
                controller:"PageController",
                controllerAs: "model"
            })

            .when("/admin" , {
                templateUrl:"views/admin/admin.view.html",
                controller:"UserController",
                controllerAs: "model"
            })

            .when("/pageDetails" , {
                templateUrl:"views/pages/pageDetails.view.html",
                controller:"PageDetailsController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo:"home"
            })
    }
})();