$(function () {

	startRender();
	function startRender() {
		// $.get('/api/user/234') -- i.e. getting data based on the unique identifier.
		// 	.then(function (user){}
		$.ajax({
			method: "GET",
			url: "/api/customers/2"
		}).then(function (response) {
			const customer = response;
			console.log(response);
			//[REQUEST]: GET [user]. In the actual code: 
			// 1. the test stuff above will be removed,
			// 2. the code below will go into the {} of the .then request above, and 
			// 3. [testUser] in the code below will be replaced with the [user] argument seen above. Or vice versa. It's all good.
			// 4. May need to add a return command in to make data accessible to click functions. Or maybe just create a universal variable?
			$('#banner').append(`Welcome, ${customer.first_name} ${customer.last_name}!`);
			renderEvents(customer.events);
			$('#banner').attr('data-id', customer.id);

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

		const clientId = $('#banner').attr('data-id', customer.id);
		// const eventId= whatever argument we used.CustomerId
		for (let i = 0; i < events.length; i++) {

			if (clientId === eventId) {
				$('#eventsBox').append(`
					<div class="oneEvent">
						<div class="eventElement">Event: ${argument.event_type}</div>
						<div class="eventElement">Type: ${argument.}</div>
						<div class="eventElement">Offer: ${c.price}</div>
						<div class="eventElement">Comments: ${c.comments}</div>
					</div>`);
			}
		}

		events.forEach(event => {

			$('#eventsBox').append(`
			<div class="oneEvent">
				<div class="eventElement">Event: ${c.eventName}</div>
				<div class="eventElement">Type: ${c.artType}</div>
				<div class="eventElement">Offer: ${c.price}</div>
				<div class="eventElement">Comments: ${c.comments}</div>
				<button class="applicantButton" id="${c.id}applicants">View Applicants</button>	
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

		const newEvent = {
			event_type: $('#virtuoso').val(),
			street_address: $('#streetAddress').val().trim,
			city: $('#city').val().trim,
			state: $('#state').val(),
			event_venue: $('#venue').val().trim(),
			budget: parseFloat($('#price').val()),
			additional_info: $('#comments').val(),
			CustomerId: $('#banner').data("id")
		}

		if (newEvent.first_name === "" || newEvent.last_name === "" || newEvent.city === "" || newEvent.street_address === "" || isNaN(newEvent.street_budget)) {
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
			$('#eventCreateModal').removeClass("show");
			$('#errorBox').removeClass("show")
			renderEvents(customer.events);
		}
	}

	$('#cancelButton').on("click", emptyCart);
	function emptyCart(event) {
		event.preventDefault();

		$('#errorBox').removeClass("show")
		$('#eventCreateModal').removeClass("show");

		$('#eventName').val('');
		$('#zipcode').val('');
		$('#price').val('');
		$('#state').val('');
		$('#comments').val('');
	}

	$("#eventsBox").on("click", ".applicantButton", applyEvent);
	function applyEvent(event) {
		event.preventDefault();
		$('#applicantModal').addClass("show");

	}
	// 	for (i=0; i<testUser.applicants.length; i++) {
	// 		//[REQUEST]: GET artist info based on the bio 
	// 		//pass it into a .then function as the argument[data], and:



	// 		$("#applicantModal").append(`
	// 			<div>
	// 				<div id="${data.id}name"> ${data.firstName} ${data.lastName}</div>
	// 				<div class="profileBox">
	// 					<img src="${data.profilePic}">
	// 				</div>
	// 				<div id="${data.id}email">${data.email}></div>
	// 			</div>
	// 		`)
	// 	}
	// }

	$('#closeApplicants').on("click", closeApplicants);
	function closeApplicants(event) {
		event.preventDefault();



		$('#applicantModal').removeClass("show");
	}

});


