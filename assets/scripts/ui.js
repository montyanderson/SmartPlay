module.exports = function() {
    $('.sortable').sortable({
		axis: "y"
	});
    $('.modal-trigger').click(function () {
          $($(this).attr("href")).openModal();
          $(document).keypress(function(e) {
              if (e.which == 13) {
                  console.log("work");
                  console.log($(this));
              }
          })
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
                    $('.validate').val($(this).data("name"));
                    $("#add-" + $(this).data("type")).openModal();
                    location.hash = "#";
                }
            });
        }
    });

};
