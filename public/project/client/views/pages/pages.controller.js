(function() {
    "use strict";

    angular.module("PageEditorApp")
        .controller("PageController",PageController);

    function PageController(PageService,$rootScope) {
        var vm = this;
        vm.alertMessage = null;

        vm.addPage = addPage;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;
        vm.selectPage=selectPage;

        vm.pages = [];
        vm.page = null;
        var currentUser = $rootScope.currentUser;


        function init()
        {
            PageService.findPageById(currentUser._id)
                .then(function(response)
                {
                    vm.pages = response.data;
                    vm.alertMessage = null;
                },function(err){
                    console.log(err);
                });
        }init();


        function addPage(page) {
            if (page.pageName != null) {
                var newPage = {
                    "title": page.pageName,
                    "userId": currentUser._id
                };
                PageService.createPageForUser(newPage)
                    .then(init(),function(err){
                        console.log(err);
                    });
                vm.page.pageName = null;
            }else{
                vm.alertMessage = "Please enter a name for the page";
            }
        }

        function updatePage(page) {
            if (page.pageName != null) {
                var updatedPage = {
                    "title":page.pageName,
                    "updated":new Date()
                };
                PageService.updatePageById(vm.page._id,updatedPage)
                    .then(init(),function(err){
                        console.log(err);
                    });
                vm.page.pageName = null;
            }else{
                vm.alertMessage = "Please select a page to update";
            }
        }

        function deletePage(index){
            PageService.deletePageById(vm.pages[index]._id)
                .then(init(),function(err){
                    console.log(err);
                });
        }

        function selectPage(index){
            vm.page = vm.pages[index];
            vm.page.pageName = vm.pages[index].title;
        }
    }
})();
