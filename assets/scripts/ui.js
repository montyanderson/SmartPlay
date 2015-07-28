module.exports = function() {
    $('.sortable').sortable({
		axis: "y"
	});
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
    });
    $('.btn-expand').hover(function () {
        $().animate({
            'padding-right':'50px'
        },1)
    }, function () {

    });
    $(document).ready(function() {
        $('.parallax').parallax();
    });

};
