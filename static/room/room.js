if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

var app = angular.module('billsplit', ['ngAnimate', 'ngClickSelect', 'directives']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});

var data = {
    name: "Dinner whatever",
    tax: 0.0785,
    tip: 0.15,
    members: {
        "asdf1": {
            name: "Yujin",
            color: "maroon"
        },
        "asdf2": {
            name: "Wenlan",
            color: "green"
        },
        "asdf3": {
            name: "Mick",
            color: "cyan"
        },
        "asdf4": {
            name: "Jeff",
            color: "pink"
        }
    },
    orders: [
        {
            id: "orderid1",
            name: "Chicken Vindaloo",
            price: 1275,
            members: ["asdf2", "asdf3"]
        },
        {
            id: "orderid2",
            name: "See Two",
            price: 1499,
            members: ["asdf1"]
        }
    ],
    wallet: {
        "card_enabled": true,
        "venmo_enabled": false,
        "cash": {
            "100": 2,
            "500": 10,
            "1000": 0,
            "2000": 4
        }
    },
    user: {
        id: "asdf1",
        color: "maroon"
    }
};

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
