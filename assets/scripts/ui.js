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

    $('#obscurity').disableSelection();

    window.addEventListener("hashchange", function() {
        if(location.hash.substr(0, 8) === "#delete-") {
            $(".sortable").children().each(function() {
                if($(this).data("name") === location.hash.substr(8)) {
                    $(this).remove();
                    location.hash = "#";
                }
            });
        }
    });

};
