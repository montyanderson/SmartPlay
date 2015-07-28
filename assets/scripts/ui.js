module.exports = function() {
    $('.sortable').sortable({
		axis: "y"
	});
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
    });
    $('.btn-expand').hover(function () {
        var attr = $(this).attr('data-direction');
        $(this).animate({
            attr:'50px',
            'border-radius':'20px'
        }, 1);
    }, function () {
        $(this).animate({
            attr:'0px',
            'border-radius':'100px'
        }, 1);
    });
    $(document).ready(function() {
        $('.parallax').parallax();
    });

};
