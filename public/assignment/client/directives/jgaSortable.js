(function(){
    "use strict";
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        var start = null,
            end = null;

        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: "y",
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    if(start >= end) {
                        start--;
                    }

                    scope.$apply(function(){
                        scope.updateForm(start,end);
                    })
                }
            });
        }
        return {
            link: link
        }
    }
})();

