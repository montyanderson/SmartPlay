module.exports = function() {
    $('.modal-trigger').click(function () {
          $('#tool-box').openModal();
    });
	$('.sortable').sortable({
		axis: "y"
	});

    $(document).ready(function() {
        $('.parallax').parallax();
    });

};
