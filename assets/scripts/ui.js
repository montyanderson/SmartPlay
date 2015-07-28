module.exports = function() {
    $('.sortable').sortable({
		axis: "y"
	});
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
    });

    $(document).ready(function() {
        $('.parallax').parallax();
    });

};
