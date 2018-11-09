$(function () {

	const testUser ={
		id: 234,
		username: "GenericPerson",
		password: "funfunfun"
	}

	function startRender(){
		$('#banner').append(`Welcome, ${testUser.username}!`);
	}

	startRender();


	$('#createEvent').on("click", eventModal)
	function eventModal(event) {
		event.preventDefault();
		$('#myModal').addClass("show");
	}

	$("#create").on("click", createEvent)
	function createEvent(event) {
		event.preventDefault();
	
		const newEvent = {
			eventName: $('#eventName').val().trim(),
			zipcode: parseInt($('#zipcode').val()),
			price: parseInt($('#zipcode').val()),
			state: $('#state').val(),
			artist: $('#virtuoso').val(),
			comments: $('#comments').val()
		}
		if (newEvent.firstName==="" || newEvent.lastName==="" || isNaN(newEvent.zipcode)) {
			errorBox.style.display = "block";
			$('#errorBox').toggleClass("alt");
		} else {
			$('#myModal').removeClass("show");
			console.log(newEvent);
			return newEvent;
		}
	}
	
	$('#cancel').on("click", emptyCart);
	function emptyCart(event) {
		event.preventDefault();
		$('#myModal').removeClass("show");
	}
});
