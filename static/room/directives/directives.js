/**
* directives Module
*
* Directives
*/
angular.module('directives' , ['directives.tabs', 'directives.wallet', 'directives.panel'])

.directive('focusMe', function($timeout, $parse) {
    return {
        // scope: true,   // optionally create a child scope
        link: function(scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
        }
    };
})

.directive('selectMe', function($timeout, $parse) {
    return {
        // scope: true,   // optionally create a child scope
        link: function(scope, element, attrs) {
            var model = $parse(attrs.selectMe);
            scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        element[0].select();
                    });
                }
            });
        }
    };
})

.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    };
});
