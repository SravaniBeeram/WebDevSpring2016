(function() {
    "use strict";
    angular.module("PageEditorApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();