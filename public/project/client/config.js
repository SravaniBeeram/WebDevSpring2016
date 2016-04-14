(function() {
    "use strict";
    angular
        .module("PageEditorApp")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })

            .when("/signup", {
                templateUrl: "views/users/signup.view.html",
                controller: "SignUpController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/pages", {
                templateUrl: "views/pages/pages.view.html",
                controller: "PageController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkAdmin
                }
            })

            .when("/PageDetails", {
                templateUrl: "views/pages/pageDetails.view.html",
                controller: "PageDetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/page/:pageId/field", {
                templateUrl: "views/pages/pageDetails.view.html",
                controller: "PageDetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .otherwise({
                redirectTo: "home"
            })

    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.role == "admin")
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                console.log("in error");
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();