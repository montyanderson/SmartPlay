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
