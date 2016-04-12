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
                    vm.password = null;
                    vm.firstName = null;
                    vm.lastName = null;
                    vm.role = null;
                    vm.alertMessage = null;
                },function(err){
                    console.log(err);
                });
        }init();

        function addUser(username,password,firstName,lastName,role) {
            if (username != null && password!= null && firstName!= null && lastName != null && role!= null) {
                var newUser = {
                    "username": username,
                    "password":password,
                    "firstName":firstName,
                    "lastName":lastName,
                    "role":role
                };
                UserService.createUser(newUser)
                    .then(init(),function(err){
                        console.log(err);
                    });
            }else{
                vm.alertMessage = "Please enter username ,firstName and lastName of the user";
            }
        }

        function updateUser(username,password,firstName,lastName,role) {
            if (username != null) {
                var userSelected = currentUsers[userIndexSelected];
                userSelected.username = username;
                userSelected.password = password;
                userSelected.firstName=firstName;
                userSelected.lastName=lastName;
                userSelected.role=role;
                UserService.updateUser(userSelected._id, userSelected)
                    .then(init(),function(err){
                        console.log(err);
                    });

            }else {
                vm.alertMessage = "Please Select a user to update";
            }
        }

        function deleteUser(index){
            userIndexSelected = index;
            UserService.deleteUserById(currentUsers[index]._id)
                .then(init(),function(err){
                    console.log(err);
                });
        }

        function selectUser(index){
            userIndexSelected = index;
            vm.username = currentUsers[index].username;
            vm.password = currentUsers[index].password;
            vm.firstName= currentUsers[index].firstName;
            vm.lastName = currentUsers[index].lastName;
            vm.role = currentUsers[index].role;
        }
    }

})();
