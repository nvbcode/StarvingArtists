const testUser = {
	id: 234,
	username: "GenericPerson",
	password: "funfunfun"
}

const createdEvents = [
	{
		id: 10,
		eventName: "Fluffy's Birthday Party",
		zipcode: "90210",
		price: 500,
		state: "AK",
		artType: "Musician",
		comments: "I want Fluffy's birthday party to be special. He loves Ray Charles, so I'm hoping for someone that plays like that.",
	}
]

$(function () {

function renderEvents() {
	$('#eventsBox').empty();
	
	for (let i = 0; i<createdEvents.length; i++) {
		const c = createdEvents[i];
		$('#eventsBox').append(`
		<div class="oneEvent">
			<div class="eventElement">Event: ${c.eventName}</div>
			<div class="eventElement">Type: ${c.artType}</div>
			<div class="eventElement">Offer: ${c.price}</div>
			<div class="eventElement">Comments: ${c.comments}</div>
		</div>`)
	}
}

	function startRender() {
		$('#banner').append(`Welcome, ${testUser.username}!`);
		renderEvents();
	}

	startRender();

	$('#createEvent').on("click", showEventModal)
	function showEventModal(event) {
		event.preventDefault();
		$('#eventCreateModal').addClass("show");
	}

	$("#createButton").on("click", createEvent)
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

		if (newEvent.firstName === "" || newEvent.lastName === "" || isNaN(newEvent.zipcode)) {
			$('#errorBox').addClass("show")
			$('#errorBox').toggleClass("alt");
		} else {
			createdEvents.push(newEvent);
			$('#eventCreateModal').removeClass("show");
			$('#errorBox').removeClass("show")
			console.log(createdEvents);
			renderEvents();
			}
		}
	
	$('#cancelButton').on("click", emptyCart);
	function emptyCart(event) {
		event.preventDefault();
		$('#eventCreateModal').removeClass("show");
	}

});


