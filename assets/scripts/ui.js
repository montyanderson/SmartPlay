module.exports = function() {
    $('.modal-trigger').on('click', function () {
          $('#tool-box').openModal();
    });
	$('#sortable').sortable({
		axis: "y"
	});
    alert("I'm running, harry!");

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
};
