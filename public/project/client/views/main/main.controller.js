(function() {
    "use strict";
    angular.module("PageEditorApp")
        .controller("MainController",MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();