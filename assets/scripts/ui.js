module.exports = function() {
    $('.sortable').sortable({
		axis: "y"
	});
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
    });

    $('.sortable').on("DOMSubtreeModified", function() {
        $('.sortable').children().last().hover(function () {
            $(this).find('i').fadeIn(500);
        }, function () {
            $(this).find('i').fadeOut(500);
        });
    });

    $(document).ready(function() {
        $('.parallax').parallax();
    });

};
