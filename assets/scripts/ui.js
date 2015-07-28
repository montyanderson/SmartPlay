module.exports = function() {
    $('.sortable').sortable({
		axis: "y"
	});
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
    });
    $('.btn-expand').hover(function () {
        var css = {'border-radius':'20px'};
        var hoverOn = {};
        hoverOn[$(this).attr("data-directionOn")] = '50px';
        hoverOn = $.extend(css,hoverOn);

        $(this).animate(hoverOn, 1);
    }, function () {
        $(this).animate({
            'border-radius':'100px'
        }, 1);
    });
    $(document).ready(function() {
        $('.parallax').parallax();
    });

};
