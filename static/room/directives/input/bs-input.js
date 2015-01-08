/**
* directives.input Module
*
* Editable text/numbers
*/
angular.module('directives.input', [])

.directive('bsInput', [function(){
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            bsModel: '=',
            bsEditing: '=',
            bsType: '@',
            bsToText: '=?',
            bsSource: '=?'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $element, $attrs, $transclude) {
            $scope.spanTemplate = '/static/room/directives/input/bs-input-span.html';
            $scope.textTemplate = '/static/room/directives/input/bs-input-text.html';
            $scope.dollarTemplate = '/static/room/directives/input/bs-input-dollar.html';
            $scope.checkboxTemplate = '/static/room/directives/input/bs-input-checkbox.html';

            $scope.template = $scope.spanTemplate;

            if (!$scope.bsToText) {
                $scope.bsToText = function(key) { return key; };
            }
            if (!$scope.bsSource) {
                $scope.bsSource = {};
            }
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<ng-include src="template"></ng-include>',
        // templateUrl: '/static/room/directives/input/bs-input.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {

            $scope.$watch('bsEditing', function(editing) {
                if (editing) {
                    if ($scope.bsType === 'dollar') {
                        $scope.template = $scope.dollarTemplate;
                    }
                    else if ($scope.bsType === 'text') {
                        $scope.template = $scope.textTemplate;
                    }
                    else if ($scope.bsType === 'checkbox') {
                        $scope.template = $scope.checkboxTemplate;
                    }
                }
                else {
                    $scope.template = $scope.spanTemplate;
                }
            })
        }
    };
}]);
