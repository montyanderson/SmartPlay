module.exports = function() {
    $('.modal-trigger').click(function () {
          $('#tool-box').openModal();
    });
	$('#sortable').sortable({
		axis: "y"
	});
    alert("I'm running, harry!");

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
};
