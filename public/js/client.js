$(function () {

	$('#createEvent').on("click", eventModal)
	function eventModal(event) {
		event.preventDefault();
		$('#myModal').addClass("show");
	}

	$("#create").on("click", createEvent)
	function createEvent(event) {
		event.preventDefault();
	
		const newEvent = {
			firstName: $('#firstName').val().trim(),
			lastName: $('#lastName').val().trim(),
			zipcode: parseInt($('#zipcode').val()),
			state: $('#state').val(),
			artist: $('#virtuoso').val()
		}
		if (newEvent.firstName==="" || newEvent.lastName==="" || isNaN(newEvent.zipcode)) {
			errorBox.style.display = "block";
			$('#errorBox').toggleClass("alt");
		} else {
			$('#myModal').removeClass("show");
			console.log(newEvent);
		}

	}
	
	$('#cancel').on("click", emptyCart);
	function emptyCart(event) {
		event.preventDefault();
		$('#myModal').removeClass("show");
	}

});
