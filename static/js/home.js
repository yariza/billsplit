var result;

$.ajax({
    url: '/api/wallet/',
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({
        use_cash: true
    }),
    success: function(data) {
        result = data;
        console.log(data);
    }
});
