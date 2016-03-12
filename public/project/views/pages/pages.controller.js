(function() {
    "use strict";

    angular.module("PageEditorApp")
        .controller("PageController",PageController);

    function PageController($scope,PageService,$rootScope) {
        $scope.alertMessage = null;
        var pageIndexSelected;
        var currentUserPages = [];
        var currentUser;


        currentUser = $rootScope.currentUser;
        PageService.findAllPages(renderPages);


        $scope.addPage = addPage;
        $scope.updatePage=updatePage;
        $scope.deletePage=deletePage;
        $scope.selectPage=selectPage;

        function renderPages(userPages){
            $scope.pages = userPages;
            currentUserPages = userPages;
        }

        function addPage(pageName) {
            if (pageName != null) {
                var newPage = {
                    "_id": null,
                    "title": pageName,
                    "userId": null
                };
                PageService.createPageForUser(newPage);
                $scope.pageName = null;
            }else{
                $scope.alertMessage = "Please enter a name for the page";
            }
        }

        function updatePage(pageName) {
            if (pageName != null) {
                var pageSelected = currentUserPages[pageIndexSelected];
                pageSelected.title = pageName;
                PageService.updatePageById(pageSelected._id, pageSelected, renderPagesAfterAction);
                $scope.pageName = null;
            }else {
                $scope.alertMessage = "Please Select a page to update";
            }
        }

        function deletePage(index){
            pageIndexSelected = index;
            PageService.deletePageById(currentUserPages[index]._id,renderPagesAfterAction);
        }

        function renderPagesAfterAction(userpages){
            PageService.findAllPages(renderPages);
        }
        function selectPage(index){
            pageIndexSelected = index;
            $scope.pageName = currentUserPages[index].title;
        }
    }

})();
