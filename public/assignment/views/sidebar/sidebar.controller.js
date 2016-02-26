(function()
{
    "use strict";
    angular.module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope, $location)
    {
        $scope.$location = $location;

        $scope.IsAdmin = function () {
            return $scope.roles === "admin"
        }
    }


})();