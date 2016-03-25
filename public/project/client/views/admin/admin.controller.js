(function() {
    "use strict";

    angular.module("PageEditorApp")
        .controller("adminController",adminController);

    function adminController(UserService,$rootScope) {
        var vm = this;
        var userIndexSelected;
        var currentUsers = [];
        var currentUser;
        vm.alertMessage = null;

        vm.addUser = addUser;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.selectUser=selectUser;


        currentUser = $rootScope.currentUser;

        function init(){
            UserService.findAllUsers()
                .then(function(response){
                    vm.users = response.data;
                    currentUsers = response.data;
                    console.log(vm.users);
                    vm.username = null;
                    vm.firstName = null;
                    vm.lastName = null;


                });
        }init();

        function addUser(username,firstName,lastName) {
            if (username != null && firstName!= null && lastName != null) {
                var newUser = {
                    "username": username,
                    "firstName":firstName,
                    "lastName":lastName
                };
                UserService.createUser(newUser)
                    .then(init());
            }else{
                vm.alertMessage = "Please enter username ,firstName and lastName of the user";
            }
        }

        function updateUser(username,firstName,lastName) {
            if (username != null) {
                var userSelected = currentUsers[userIndexSelected];
                userSelected.username = username;
                userSelected.firstName=firstName;
                userSelected.lastName=lastName;
                UserService.updateUser(userSelected._id, userSelected)
                    .then(init());

            }else {
                vm.alertMessage = "Please Select a user to update";
            }
        }

        function deleteUser(index){
            userIndexSelected = index;
            UserService.deleteUserById(currentUsers[index]._id)
                .then(init());
        }

        function selectUser(index){
            userIndexSelected = index;
            vm.username = currentUsers[index].username;
            vm.firstName= currentUsers[index].firstName;
            vm.lastName = currentUsers[index].lastName;
        }
    }

})();
