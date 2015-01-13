/**
* directives.wallet Module
*
* Wallet pane
*/
angular.module('directives.wallet', [])

.directive('bsWallet', [function(){
    return {
        // name: '',
        // priority: 1,
        // terminal: true,n
        scope: true, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $element, $attrs, $transclude) {
            var roomCtrl = $scope.$parent.$parent.roomCtrl;

            $scope.cashEnabled = false;
            $scope.cardEnabled = false;

            $scope.cashHeader = false;
            $scope.cardHeader = true;

            $scope.cash = {
                '100': 0,
                '500': 2,
                '1000': 4,
                '2000': 2
            };

            $scope.decrementCash = function(bill) {
                $scope.cash[bill] = ($scope.cash[bill]-1).clamp(0, 99);
            }

            $scope.incrementCash = function(bill) {
                $scope.cash[bill] = ($scope.cash[bill]+1).clamp(0, 99);
            }
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '/static/room/directives/wallet/bs-wallet.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            
        }
    };
}]);