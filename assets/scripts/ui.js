module.exports = function() {
    $('.sortable').sortable({
		axis: "y"
	});
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
          $('.validate').val('').blur();
          var self = this;
          $(document).keypress(function(e) {
              if (e.which == 13) {
                  $('.enter-sub')[0].click();
              }
          });
    });
    $(document).ready(function() {
        $('.parallax').parallax();
    });

    window.addEventListener("hashchange", function() {
        if(location.hash.substr(0, 8) === "#delete-") {
            $(".sortable").children().each(function() {
                if($(this).data("name") === location.hash.substr(8)) {
                    $(this).remove();
                    location.hash = "#";
                }
            });
        }
        if(location.hash.substr(0, 6) === "#edit-") {
            $(".sortable").children().each(function() {
                if($(this).data("name") === location.hash.substr(6)) {
                    $('.validate').val($(this).data("name")).focus();
                    $("#add-" + $(this).data("type")).openModal();
                    location.hash = "#";
                }
            });
        }
    });

};
