(function() {
    "use strict";

    angular.module("PageEditorApp")
        .controller("PageShareController", PageShareController);

    function PageShareController(FieldService, $routeParams) {
        var vm = this;
        var pageId;
        vm.getButtonClass = getButtonClass;
        vm.trustAsHtml=trustAsHtml;
        vm.safeYouTubeUrl=safeYouTubeUrl;

        if ($routeParams.pageId) {
            pageId = $routeParams.pageId;
        }

        function init() {

            FieldService.findPageFields(pageId)
                .then(function (response) {
                    vm.fields = response.data;
                }, function (err) {
                    console.log(err);
                });

        }

        init();


        function getButtonClass(style){
            console.log("button class");
            if(!style){
                style = "default";
            }
            return "btn-"+style.toLowerCase();
        }

        function trustAsHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function safeYouTubeUrl(field) {
            if(field && field.youTube) {
                var urlParts = field.youTube.url.split("/");
                var youTubeId = urlParts[urlParts.length-1];
                return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+youTubeId);
            }
            return "";
        }

    }
})();
