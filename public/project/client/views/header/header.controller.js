(function() {
    "use strict";
    angular.module("PageEditorApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,UserService,$location) {
        $scope.$location = $location;
        $scope.logout=logout;

        function logout(){
            UserService.setCurrentUser(null);

        };
    }
})();