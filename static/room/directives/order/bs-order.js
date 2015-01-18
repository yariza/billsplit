/**
* directives.order Module
*
* Orders pane
*/
angular.module('directives.order', [])

.directive('bsOrderList', [function(){
    return {
        controller: function($scope, $element, $attrs, $transclude) {

            $scope.orders = $scope.data.orders;

            $scope.currentID = null;
            $scope.toggleOrder = function(orderID) {
                if ($scope.currentID === orderID) {
                    $scope.currentID = null;
                }
                else {
                    $scope.currentID = orderID;
                }
            };
            $scope.hideOrders = function() {
                $scope.currentID = null;
            };
            $scope.addOrder = function() {
                var newOrder = {
                    name: "New Order",
                    price: 0,
                    members: {}
                };
                $scope.data.orders['new_order'] = newOrder;
                $scope.toggleOrder('new_order');
            };
        },
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: '/static/room/directives/order/bs-order-list.html',
        link: function($scope, iElm, iAttrs, controller) {
            iElm.children().height($(window).height());
        }
    };
}])

.directive('bsOrder', ['$filter', function($filter){
    return {
        controller: function($scope, $element, $attrs, $transclude) {
            $scope.isSelected = function() {
                return $scope.orderID === $scope.currentID;
            };

            $scope.priceText = function(price) {
                return $filter('currency')(price);
            };

            $scope.memberText = function(members) {
                var type = typeof members;
                if (type === 'string') {
                    return $scope.getMemberName(members);
                }
                else if (type === 'object') {
                    return $.map(members, function(value, key) {
                        if (value) {
                            return $scope.getMemberName(key);
                        }
                        else {
                            return null;
                        }
                    }).join(', ');
                }
                else {
                    return 'null';
                }
            };
        },
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: '/static/room/directives/order/bs-order.html',
        link: function($scope, iElm, iAttrs, controller) {

        }
    };
}]);

;