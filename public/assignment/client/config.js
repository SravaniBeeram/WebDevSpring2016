(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController",
                controllerAs:"model"
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs:"model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model"
            })

            .when("/form", {
                templateUrl: "views/forms/forms.view.html",
                controller:"FormController",
                controllerAs:"model"
            })

            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller:"FieldController",
                controllerAs:"model"
            })

            .when("/form/:formId/fields",{
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                controllerAs:"model"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController",
                controllerAs:"model"
            })

            .otherwise({
                redirectTo:"home"
            })
    }
})();