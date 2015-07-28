module.exports = function() {
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
    });

	$('.sortable').sortable({
		axis: "y"
	});

    $(document).ready(function() {
        $('.parallax').parallax();
    });

};
