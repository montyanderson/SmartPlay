module.exports = function() {
    $('.scroll').hover(function() {
        $(this).animate({
            'padding-right': '100px',
            'border-radius': '20px'
        });
    }, function () {

    });
	$('#sortable').sortable({
		axis: "y"
	});
};
