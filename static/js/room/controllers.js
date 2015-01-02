(function() {

    app.controller('RoomController', [function(){
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

    app.controller('OrderListController', [function(){

        this.current = null;
        this.toggleOrder = function(orderCtrl) {
            if (this.current === orderCtrl) {
                orderCtrl.hideOrder();
                this.current = null;
            }
            else {
                if (this.current !== null) {
                    this.current.hideOrder();
                }
                orderCtrl.showOrder();
                this.current = orderCtrl;
            }
        };
        this.hideOrders = function() {
            if (this.current !== null) {
                this.current.hideOrder();
                this.current = null;
            }
        }
    }]);

    app.controller('OrderController', [function(){
        this.data = null;
        this.editing = false;
        this.selectPrice = false;

        this.hideOrder = function() {
            this.editing = false;
        };

        this.showOrder = function() {
            this.editing = true;
        };
    }]);

    app.controller('OrderPriceController', [function(){
        this.input = 0.00;
        this.updatePrice = function(orderCtrl) {
            orderCtrl.data.price = Math.floor(input * 100);
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