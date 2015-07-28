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
