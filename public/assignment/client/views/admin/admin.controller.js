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
        vm.userSort = userSort;
        vm.sortOnUsername=sortOnUsername;
        vm.sortOnFirstName=sortOnFirstName;
        vm.sortOnLastName=sortOnLastName;

        currentUser = $rootScope.currentUser;

        function init(){
            UserService.findAllUsers()
                .then(function(users){
                    currentUsers = users.data;
                    vm.users = users.data;
                    console.log(vm.users);
                    vm.username = null;
                    vm.password = null;
                    vm.firstName = null;
                    vm.lastName = null;
                    vm.roles = null;
                },function(err){
                    console.log(err);
            });
        }init();

        function addUser(username,password,firstName,lastName,roles) {
            if (username != null && password!= null && firstName!= null && lastName != null && roles != null) {
                var newUser = {
                    "username": username,
                    "password":password,
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

        function updateUser(username,password,firstName,lastName,roles) {
            if (username != null) {
                var userSelected = currentUsers[userIndexSelected];
                userSelected.username = username;
                userSelected.password = password;
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
            vm.password = currentUsers[index].password;
            vm.firstName= currentUsers[index].firstName;
            vm.lastName = currentUsers[index].lastName;
            vm.roles = currentUsers[index].roles;
        }

        function userSort(func) {
            vm.users.sort(func);
            vm.ascending = !vm.ascending;
        }

        function sortOnUsername(user1, user2) {
            var val = 0;
            if (user1.username < user2.username) {
                  val = -1;
            }
            else if (user1.username === user2.username) {
                val = 0;
            }
            else {
                val = 1;
            }

            if(vm.ascending) {
                val = val * -1;
            }

            return val;
        }

        function sortOnFirstName(user1, user2) {
            var val = 0;
            if (user1.firstName < user2.firstName) {
                val = -1;
            }
            else if (user1.firstName === user2.firstName) {
                val = 0;
            }
            else {
                val = 1;
            }

            if(vm.ascending) {
                val = val * -1;
            }

            return val;
        }

        function sortOnLastName(user1, user2) {
            var val = 0;
            if (user1.lastName < user2.lastName) {
                val = -1;
            }
            else if (user1.lastName === user2.lastName) {
                val = 0;
            }
            else {
                val = 1;
            }

            if(vm.ascending) {
                val = val * -1;
            }

            return val;
        }


    }

})();
