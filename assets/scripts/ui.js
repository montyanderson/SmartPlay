module.exports = function() {
    $('.sortable').sortable({
		axis: "y",
        revert: true,
        containment: ".sort-container"
	});
    $('.bin').addClass('notransition');
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
          $('.validate').val('').focus();
    });
    $(document).ready(function() {
        $('.parallax').parallax();
    });

    window.addEventListener("hashchange", function() {
        if(location.hash.substr(0, 8) === "#delete-") {
            $(".sortable").children("li").each(function() {
                if($(this).data("name") === location.hash.substr(8)) {
                    $(this).remove();
                    $('.sort-container').scrollTop($('.sort-container').height());
                    counter--;
                    if (counter === 0) {
                        $('.default-msg').show();
                    }
                    if (counter <= '3') {
                        $('.sort-container').css({
                            height: '100%',
                        });
                    }
                    location.hash = "#";
                }
            });
        }
        if(location.hash.substr(0, 6) === "#edit-") {
            $(".sortable").children("li").each(function() {
                if($(this).data("name") === location.hash.substr(6)) {
                    $('.validate').val($(this).data("name")).focus();
                    $("#add-" + $(this).data("type")).openModal();
                    location.hash = "#";
                }
            });
        }
    });

};
