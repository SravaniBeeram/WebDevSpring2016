(function() {
    "use strict";

    angular.module("PageEditorApp")
        .controller("UserController",UserController);

    function UserController($scope,UserService,$rootScope) {
        $scope.alertMessage = null;
        var userIndexSelected;
        var currentUsers = [];
        var currentUser;

            currentUser = $rootScope.currentUser;
            UserService.findAllUsers(renderUsers);


        $scope.addUser = addUser;
        $scope.updateUser=updateUser;
        $scope.deleteUser=deleteUser;
        $scope.selectUser=selectUser;

        function renderUsers(allUsers){
            $scope.users = allUsers;
            currentUsers = allUsers;
        }

        function addUser(username,firstName,lastName) {
            if (username != null && firstName!= null && lastName != null) {
                var newUser = {
                    "_id": (new Date).getTime(),
                    "username": username,
                    "firstName":firstName,
                    "lastName":lastName
                };
                UserService.createUser(newUser);
                $scope.username = null;
                $scope.firstName = null;
                $scope.lastName = null;

            }else{
                $scope.alertMessage = "Please enter username ,firstName and lastName of the user";
            }
        }

        function updateUser(username,firstName,lastName) {
            if (username != null) {
                var userSelected = currentUsers[userIndexSelected];
                userSelected.username = username;
                userSelected.firstName=firstName;
                userSelected.lastName=lastName;
                UserService.updateUser(userSelected._id, userSelected, renderUserAfterAction);
                $scope.username = null;
                $scope.firstName = null;
                $scope.lastName = null;

            }else {
                $scope.alertMessage = "Please Select a user to update";
            }
        }

        function deleteUser(index){
            userIndexSelected = index;
            UserService.deleteUserById(currentUsers[index]._id,renderUserAfterAction);
        }

        function renderUserAfterAction(allusers){
            UserService.findAllUsers(renderUsers);
        }
        function selectUser(index){
            userIndexSelected = index;
            $scope.username = currentUsers[index].username;
            $scope.firstName= currentUsers[index].firstName;
            $scope.lastName = currentUsers[index].lastName;
        }
    }

})();
