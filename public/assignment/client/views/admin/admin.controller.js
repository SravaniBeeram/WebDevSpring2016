(function() {
    "use strict";

    angular.module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController(UserService,$rootScope) {
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
                    vm.username = null;
                    vm.firstName = null;
                    vm.lastName = null;
                    vm.roles = null;


                });
        }init();

        function addUser(username,firstName,lastName,roles) {
            if (username != null && firstName!= null && lastName != null && roles != null) {
                var newUser = {
                    "username": username,
                    "firstName":firstName,
                    "lastName":lastName,
                    "roles":roles
                };
                UserService.createUser(newUser)
                    .then(init());
            }else{
                vm.alertMessage = "Please enter username ,firstName,lastName and role of the user";
            }
        }

        function updateUser(username,firstName,lastName,roles) {
            if (username != null) {
                var userSelected = currentUsers[userIndexSelected];
                userSelected.username = username;
                userSelected.firstName=firstName;
                userSelected.lastName=lastName;
                userSelected.roles=roles;
                UserService.updateUser(userSelected._id, userSelected)
                    .then(init());

            }else {
                vm.alertMessage = "Please Select a user to update";
            }
        }

        function deleteUser(index){
            userIndexSelected = index;
            console.log(currentUsers[index]._id);
            UserService.deleteUserById(currentUsers[index]._id)
                .then(init());
        }

        function selectUser(index){
            userIndexSelected = index;
            vm.username = currentUsers[index].username;
            vm.firstName= currentUsers[index].firstName;
            vm.lastName = currentUsers[index].lastName;
            vm.roles = currentUsers[index].roles;
        }
    }

})();
