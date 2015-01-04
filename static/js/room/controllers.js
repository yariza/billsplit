(function() {

    app.controller('RoomController', ['$scope', function($scope){
        this.data = data;
        this.showUserMenu = false;

        this.toggleUserMenu = function() {
            this.showUserMenu = !this.showUserMenu;
        };

        this.getMembers = function(memberIDs) {
            return memberIDs.map(function(id) {
                return this.data.members[id];
            });
        };

        this.getMemberNames = function(memberIDs) {
            return memberIDs.map(function(id) {
                return this.data.members[id].name;
            });
        };
    }]);

    app.controller('OrderListController', ['$scope', '$timeout', function($scope, $timeout){

        this.orders = $scope.$parent.roomCtrl.data['orders'];
        this.currentID = null;
        this.toggleOrder = function(order) {
            var orderList = this;
            $timeout(function() {
                if (orderList.currentID === order['id']) {
                    orderList.currentID = null;
                }
                else {
                    orderList.currentID = order['id'];
                }
            });
        };
        this.hideOrders = function() {
            this.currentID = null;
        }
        this.addOrder = function() {
            var newOrder = {
                id: "new_order",
                name: "New Order",
                price: 0,
                members: []
            };
            this.orders.push(newOrder);
            this.toggleOrder(newOrder);
        }
    }]);

    app.controller('OrderController', ['$scope', function($scope){
        this.selectPrice = false;

        this.editing = function() {
            return $scope.$parent.orderListCtrl.currentID === $scope.$parent.order['id'];
        }
    }]);

    app.controller('OrderPriceController', [function(){
        this.input = 0.00;
        this.updatePrice = function(orderCtrl) {
            orderCtrl.data.price = Math.floor(this.input * 100);
        };
    }]);

    app.controller('OrderMemberController', [function(){
        this.memberID = "";
        this.selected;

        this.updateMembers = function(orderCtrl) {
            if (this.selected) {
                if (orderCtrl.data.members.indexOf(this.memberID) === -1) {
                    orderCtrl.data.members.push(this.memberID);
                }
            }
            else {
                var index = orderCtrl.data.members.indexOf(this.memberID);
                if (index !== -1) {
                    orderCtrl.data.members.splice(index, 1);
                }
            }
        }
    }]);

}());