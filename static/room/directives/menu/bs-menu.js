/**
* directives.menu Module
*
* User Menu
*/
angular.module('directives.menu', [])

.directive('bsMenu', [function(){
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $element, $attrs, $transclude) {

            $scope.showUserMenu = false;

            $scope.toggleUserMenu = function() {
                $scope.showUserMenu = !$scope.showUserMenu;
            };
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '/static/room/directives/menu/bs-menu.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            
        }
    };
}]);