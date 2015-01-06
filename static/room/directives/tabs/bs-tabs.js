/**
* directives.tabs Module
*
* Tabs for BillSplit.
*/
angular.module('directives.tabs', [])

.directive('bsTabs', function() {
    return {
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: '/static/room/directives/tabs/bs-tabs.html',
        transclude: true,
        controller: function($scope) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };

            this.addPane = function(pane) {
                if (panes.length === 0) {
                    $scope.select(pane);
                }
                panes.push(pane);
            }
        }
    };
})

.directive('bsPane', function() {
    return {
        require: '^bsTabs',
        restrict: 'E',
        transclude: true,
        scope: {
            bsTitle: '@'
        },
        link: function(scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        templateUrl: '/static/room/directives/tabs/bs-pane.html'
    };
});
