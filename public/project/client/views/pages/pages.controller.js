(function() {
    "use strict";

    angular.module("PageEditorApp")
        .controller("PageController",PageController);

    function PageController(PageService,$rootScope) {
        var vm = this;
        vm.alertMessage = null;
        var pageIndexSelected;
        var currentUserPages = [];

        vm.addPage = addPage;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;
        vm.selectPage=selectPage;

        var currentUser = $rootScope.currentUser;


        function init()
        {
            PageService.findPageById(currentUser._id)
                .then(function(response)
                {
                    vm.pages = response.data;
                    currentUserPages = response.data;
                    vm.pageName = null;
                });
        }init();


        function addPage(pageName) {
            if (pageName != null) {
                var newPage = {
                    "title": pageName,
                    "userId": currentUser._id
                };
                PageService.createPageForUser(newPage)
                    .then(init());
            }else{
                vm.alertMessage = "Please enter a name for the page";
            }
        }

        function updatePage(pageName) {
            if (pageName != null) {
                var pageSelected = currentUserPages[pageIndexSelected];
                pageSelected.title = pageName;
                PageService.updatePageById(pageSelected._id, pageSelected)
                              .then(init());
            }else {
                vm.alertMessage = "Please Select a page to update";
            }
        }

        function deletePage(index){
            pageIndexSelected = index;
            PageService.deletePageById(currentUserPages[index]._id)
                .then(init());
        }

        function selectPage(index){
            pageIndexSelected = index;
            vm.pageName = currentUserPages[index].title;
        }
    }
})();
