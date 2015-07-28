module.exports = function() {
    $('.sortable').sortable({
		axis: "y"
	});
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
    });
    $('.btn-expand').hover(function () {
        $(this).animate({
            $(this).attr('data-direction'):'50px',
            'border-radius':'20px'
        }, 1);
    }, function () {
        $(this).animate({
            $(this).attr('data-direction'):'0px',
            'border-radius':'100px'
        }, 1);
    });
    $(document).ready(function() {
        $('.parallax').parallax();
    });

};
