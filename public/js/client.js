$(function () {
	let eventId;
	let customer;
	const getYouTube=function(url){
		let youtube=url;
		youtube=youtube.substring(32);
		console.log(youtube);
		const iFrame=`<iframe width="400" height="315" src="https://www.youtube.com/embed/${youtube}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
		console.log(iFrame);
		return iFrame
	}



	startRender();

	function startRender() {
		// $.get('/api/user/234') -- i.e. getting data based on the unique identifier.
		// 	.then(function (user){}
		$.ajax({
			method: "GET",
			url: `/api/customers/${localStorage.id}`,
			headers: {
				"authorization": `Bearer ${localStorage.token}`
			}
		}).then(function (response) {
			customer = response;
			console.log(customer);
			//[REQUEST]: GET [user]. In the actual code: 
			// 1. the test stuff above will be removed,
			// 2. the code below will go into the {} of the .then request above, and 
			// 3. [testUser] in the code below will be replaced with the [user] argument seen above. Or vice versa. It's all good.
			// 4. May need to add a return command in to make data accessible to click functions. Or maybe just create a universal variable?
			$('#banner').append(`Welcome, ${customer.first_name} ${customer.last_name}!`);
			$('#banner').attr('data-id', customer.id);

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

		console.log(events);

		for (let i = 0; i < events.length; i++) {
			$('#eventsBox').append(`
					<div class="oneEvent">
						<div class="eventElement">Event: ${events[i].event_type}</div>
						<div class="eventElement">Venue: ${events[i].venue_name}</div>
						<div class="eventElement">Adddress: ${events[i].street_address} ${events[i].city}, ${events[i].state} </div>
						<div class="eventElement">Offer: ${events[i].budget}</div>
						<div class="eventElement">Comments: ${events[i].additional_info}</div>`);
						
						//if statement to only give option to book if event has no current booking
						if(events[i].has_booking === true){
							$('#eventsBox').append('<div class="eventElement">Congratulations on booking your event!');
						} else $('#eventsBox').append(`<button class="applicantButton" id="${events[i].id}applicants" data-toggle="modal" data-target="#applicantModal" >View Applicants</button>	
					</div>`);
		}
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
			street_address: $('#streetAddress').val().trim(),
			city: $('#city').val().trim(),
			state: $('#state').val(),
			venue_name: $('#venue').val().trim(),
			budget: parseFloat($('#price').val()),
			additional_info: $('#comments').val(),
			CustomerId: customer.id
		}

		if (newEvent.CustomerId === "" || newEvent.city === "" || newEvent.street_address === "" || isNaN(newEvent.budget)) {
			$('#errorBox').addClass("show")
			$('#errorBox').toggleClass("alt");
		} else {
			// eventsList.push(newEvent);
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
				}).catch(function (error) {
					console.log(error);
				});

			// testUser.createdEvents.push(newEvent.id);
			// $.put('/user)
			//[REQUEST]: PUT [eventID]. In the actual code: 
			// 1. the test stuff above will be removed, but we somehow still need to reference the object [testUser].
			//		NOTE: may end up reconstructing the whole thing with a return or just create a global-scale variabe (i.e. where the test
			//		information currently sits.)
			//		Since we're only pushing, a global variable would probably be easy.
			$('#eventCreateModal').removeClass("show");
			$('#errorBox').removeClass("show");

			location.reload();
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
		eventId = parseInt(this.id[0]);
		$(".modal-body").empty();
		$.get(`/api/applicants/${eventId}`)
			.then(function (applicants) {
				console.log(applicants);

				for (let i = 0; i < applicants.length; i++) {
					//[REQUEST]: GET artist info based on the bio 
					//pass it into a .then function as the argument[data], and:

					$.get(`/api/artist/${applicants[i].ArtistId}`)
						.then(function (artist) {
							console.log(artist);

							const applicantName = $("<p>").attr("id", applicants[i].id).text(`Artist Name: ${artist.first_name} ${artist.last_name}`);
							const demo = getYouTube(artist.demo);
							const city = $("<p>").text(`City: ${artist.city}`);
							const state = $("<p>").text(`State: ${artist.state}`);
							const confirmBtn = $(`<button id="confirm" value= ${applicants[i].id}>`).text('Confirm');


							$(".modal-body").append(applicantName).append(demo).append(city).append(state).append(confirmBtn).append("<hr>");
						}).catch(function (error) {
							console.log(error);
						});
				}
				if (applicants.length === 0) {
					const emptyText = $("<p>").text("No applications");
					$(".modal-body").append(emptyText);
				}
				$('#applicantModal').addClass("show");
			});
	}


	const confirmApplicant = function (e) {
		e.preventDefault();
		let applicantId = $(this).val();
		console.log(`eventId: ${eventId}`);
		console.log(`applicantId: ${applicantId}`);
		$.ajax({
			method: 'PUT',
			url: `/api/applicants/${applicantId}`,
			data: {
				'bid_win': true,
			}
		}).then(function (res) {
			console.log(res);
		});
		console.log(`before second ajax`);
		$.ajax({
			method: 'PUT',
			url: `/api/events/${eventId}`,
			data: {
				'has_booking': true,
			}
		}).then(function (res) {
			console.log(res);
		}).then(function(){
			alert('Thanks for booking! Your artist will be in touch');
			$('#applicantModal').removeClass('show');
		})


	};
	$('.modal-body').on('click', '#confirm', confirmApplicant);

	$('#closeApplicants').on("click", closeApplicants);
	function closeApplicants(event) {
		event.preventDefault();
		$('#applicantModal').removeClass("show");
	}

});


