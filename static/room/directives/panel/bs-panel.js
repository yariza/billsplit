/**
* directives.panel Module
*
* Collapsible panel
*/
angular.module('directives.panel', ['multi-transclude'])

.directive('bsPanel', [function(){
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            enabled: '=',
            headerOnly: '='
        },
        controller: function($scope, $element, $attrs, $transclude) {
            $scope.enabled = true;
            $scope.headingClicked = function() {
                $scope.enabled = !$scope.enabled;
            };
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '/static/room/directives/panel/bs-panel.html',
        // replace: true,
        transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            
        }
    };
}]);
