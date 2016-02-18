(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.html"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html"
            })

            .when("/form", {
                templateUrl: "views/form/form.view.html"
            })

            .when("/fields", {
                templateUrl: "views/forms/field.view.html"
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html"
            })

            .when("/username", {
                templateUrl: "views/profile/profile.view.html"
            })

            .otherwise({
                redirectTo: "home"
            });
    }
})();