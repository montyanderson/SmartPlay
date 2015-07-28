module.exports = function() {
    $('.sortable').sortable({
		axis: "y"
	});
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
    });
    $('.btn-expand').hover(function () {
        $(this).animate({
            'padding-right':'20px'
        })
    }, function () {

    });
    $(document).ready(function() {
        $('.parallax').parallax();
    });

};
