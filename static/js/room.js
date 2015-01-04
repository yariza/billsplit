if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

var app = angular.module('billsplit', ['ngClickSelect']).config(function($interpolateProvider){
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
    ]
}

$('#order-list').css('height', $(window).height());

