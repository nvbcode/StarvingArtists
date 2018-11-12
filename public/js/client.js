//THIS IS ALL TEST DATA: ONCE THE FRONT AND BACK ARE LINKED, EVERYTHING BETWEEN THIS AND [END: DELETE ALL] WILL BE REMOVED.

//NOTE: in the text data, all users IDs are 3 digits. All event IDs are 2 digits.

//[REQUEST]: GET info from database by [id].

const testUser = {
	id: 234,
	username: "GenericPerson",
	password: "funfunfun",
	createdEvents: [
		10
	]
}

const eventsList = [
	{
		id: 10,
		eventName: "Fluffy's Birthday Party",
		zipcode: "90210",
		price: 500,
		state: "AK",
		artType: "Musician",
		comments: "I want Fluffy's birthday party to be special. He loves Ray Charles, so I'm hoping for someone that plays like that.",
		creator: 234,
		applications: [
			427,		//Bob Bobberson, the example from the artist section.
			619			//another example to simulate having multiple applicants.
		]
	},
	{
		id: 22,
		eventName: "Bar Mitzvah Bash",
		zipcode: "19405",
		price: 15,
		state: "NJ",
		artType: "Musician",
		comments: "We need something cheap.",
		creator: 117, 		//Not actually tied to anything, but every event needs to be tied to a client profile.
		applicants: [427]
	}
]

let customer;

//[END: DELETE ALL]

$(function () {

	startRender();
	function startRender() {
		// $.get('/api/user/234') -- i.e. getting data based on the unique identifier.
		// 	.then(function (user){}
		$.ajax({
			method: "GET",
			url: "/api/customers/2"
		}).then(function (response) {
			customer = response;
			console.log(response);
			//[REQUEST]: GET [user]. In the actual code: 
			// 1. the test stuff above will be removed,
			// 2. the code below will go into the {} of the .then request above, and 
			// 3. [testUser] in the code below will be replaced with the [user] argument seen above. Or vice versa. It's all good.
			// 4. May need to add a return command in to make data accessible to click functions. Or maybe just create a universal variable?
			$('#banner').append(`Welcome, ${customer.first_name} ${customer.last_name}!`);
			renderEvents(customer.events);

		}).catch(function (err) {
			console.log("Error", err);
		});


	}

	//CREATING THE EVENTS LIST: This is a generic function that makes a list of available events. Called in the startRender function 
	//and the createEvent click function.
	function renderEvents(events) {
		// $.get('/api/events/234')
		// 	.then(function (events){}

		//[REQUEST]: GET [events]. In the actual code: 
		// 1. the test stuff above will be removed,
		// 2. the code below will go into the {} of the .then request above, and 
		// 3. the [eventsList] variables below should correspond to the [events] argument that will be passed in.
		// 4. May need to add a return command in to make data accessible to click functions. Or maybe just create a universal variable?
		$('#eventsBox').empty();

		// for (let i = 0; i < events.length; i++) {

		// 	const c = events[i];
		// 	if (testUser.id === c.creator) {
		// 		$('#eventsBox').append(`
		// 			<div class="oneEvent">
		// 				<div class="eventElement">Event: ${c.eventName}</div>
		// 				<div class="eventElement">Type: ${c.artType}</div>
		// 				<div class="eventElement">Offer: ${c.price}</div>
		// 				<div class="eventElement">Comments: ${c.comments}</div>
		// 			</div>`);
		// 	}
		// }

		events.forEach(event => {

			$('#eventsBox').append(`
					<div class="oneEvent">
		 				<div class="eventElement">Event: ${event.venue_name}</div>
		 				<div class="eventElement">Type: ${event.event_type}</div>
		 				<div class="eventElement">Offer:$${event.budget}</div>
		 				<div class="eventElement">Comments: ${event.additional_info}</div>
		 			</div>`);

		});
	}

	$('#createEvent').on("click", showEventModal)
	function showEventModal(event) {
		event.preventDefault();
		$('#eventCreateModal').addClass("show");
	}

	$("#createButton").on("click", createEvent)
	function createEvent(e) {
		e.preventDefault();
		//VERY IMPORTANT! Currently, this event ID is being randomly generated for testing. In the actual program, this will not exist, 
		//and mySQL will take care of it.
		const fakeID = Math.floor(Math.random() * 100)

		const newEvent = {
			event_type: $('#virtuoso').val(),
			street_address: "123 Bogus St.",
			city: "Alpharetta", //parseInt($('#zipcode').val()),
			state: $('#state').val(),
			event_venue: $('#eventName').val().trim(),
			budget: parseFloat($('#price').val()),
			additional_info: $('#comments').val(),
			has_booking: false,
			CustomerId: customer.id,		
		}


		if (newEvent.first_name === "" || newEvent.last_name === "" || newEvent.city === "") {
			$('#errorBox').addClass("show")
			$('#errorBox').toggleClass("alt");
		} else {
			eventsList.push(newEvent);
			// $.put('/api/events)
			//[REQUEST]: PUT [newEvents]. In the actual code: 
			// 1. the test stuff above will be removed, but we somehow still need to reference the object [testUser].
			//		NOTE: may end up reconstructing the whole thing with a return or just create a global-scale variabe (i.e. where the test
			//		information currently sits.)
			//		Since we're only pushing, a global variable would probably be easy.

			console.log(newEvent);

			$.post('/api/events', newEvent)
				.then(function (data) {
					console.log(data);
				}).catch(function(error){
					console.log(error);
				});

			testUser.createdEvents.push(newEvent.id);
			// $.put('/user)
			//[REQUEST]: PUT [eventID]. In the actual code: 
			// 1. the test stuff above will be removed, but we somehow still need to reference the object [testUser].
			//		NOTE: may end up reconstructing the whole thing with a return or just create a global-scale variabe (i.e. where the test
			//		information currently sits.)
			//		Since we're only pushing, a global variable would probably be easy.
		}
		$('#eventCreateModal').removeClass("show");
		$('#errorBox').removeClass("show")
		renderEvents(customer.events);
	}

	$('#cancelButton').on("click", emptyCart);
	function emptyCart(event) {
		event.preventDefault();
		$('#eventCreateModal').removeClass("show");
	}

});


