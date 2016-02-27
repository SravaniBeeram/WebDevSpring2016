(function() {
    "use strict";

    angular.module("FormBuilderApp")
           .controller("FormController",FormController);

    function FormController($scope,FormService,$rootScope) {

         $scope.addForm;
         $scope.updateForm;
         $scope.deleteForm;
         $scope.selectForm;

        function addForm() {

        }

        function updateForm(newForm) {
            $scope.message = null;
            var id = $rootScope.currentUser._id;

            UserService.updateUser(id, newForm, render);

            function render(newForm) {
                if (newForm) {
                    $scope.message = "User Updated Successfully";
                    //  console.log(user);
                } else {
                    $scope.message = "Unable to update the user";
                }
            }
        }

        function deleteForm(){

        }

        function selectForm(){

        }
    }

})();
