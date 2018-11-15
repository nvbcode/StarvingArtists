$(function () {
	let eventId;
	let customer;
	
	const getYouTube = function (url) {
		let youtube = url;
		youtube = youtube.substring(32);
		console.log(youtube);
		const iFrame = `<iframe width="400" height="315" src="https://www.youtube.com/embed/${youtube}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
		console.log(iFrame);
		return iFrame
	}

	startRender();

	function startRender() {

		$.ajax({
			method: "GET",
			url: `/api/customers/${localStorage.id}`,
			headers: {
				"authorization": `Bearer ${localStorage.token}`
			}
		}).then(function (response) {
			customer = response;
			console.log(customer);

			$('#banner').append(`Welcome, ${customer.first_name} ${customer.last_name}!`);
			$('#banner').attr('data-id', customer.id);

			renderEvents(customer.events);

		}).catch(function (err) {
			console.log("Error", err);
		});

	}

	function renderEvents(events) {

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

			if (events[i].has_booking === true) {
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

			$.ajax({
				method: "POST",
				url: '/api/events',
				data: newEvent,
				headers: {
					"authorization": `Bearer ${localStorage.token}`
				}
			}).then(function (data) {
				console.log(data);
			}).catch(function (error) {
				console.log(error);
			});

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
		$('#applicantModal').addClass("hide");

		eventId = parseInt(this.id[0]);
		$(".modal-body").empty();

		$.ajax({
			method: "GET",
			url: `/api/applicants/${eventId}`,
			headers: {
				"authorization": `Bearer ${localStorage.token}`
			}
		}).then(function (applicants) {
			console.log(applicants);

			for (let i = 0; i < applicants.length; i++) {

				$.ajax({
					method: "GET",
					url: `/api/artist/${applicants[i].ArtistId}`,
					headers: {
						"authorization": `Bearer ${localStorage.token}`
					}
				}).then(function (artist) {
					console.log(artist);

					const applicantName = $("<p>").attr("id", applicants[i].id).text(`Artist Name: ${artist.first_name} ${artist.last_name}`);
					const demo = `<iframe width="360" height="315" src="https://www.youtube.com/embed/${artist.demo.split("/").pop()}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
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

		$.ajax({
			method: 'PUT',
			url: `/api/applicants/${applicantId}`,
			data: {
				'bid_win': true,
			},
			headers: {
				"authorization": `Bearer ${localStorage.token}`
			}
		}).then(function (res) {
			console.log(res);
		});

		$.ajax({
			method: 'PUT',
			url: `/api/events/${eventId}`,
			data: {
				'has_booking': true,
			},
			headers: {
				"authorization": `Bearer ${localStorage.token}`
			}
		}).then(function (res) {
			console.log(res);
		}).then(function () {
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

	
	const logoutFn = function (e) {
		console.log('has been clicked');
		e.preventDefault();
		localStorage.token = '';
		window.location.replace('/');
	};

	$('#logout').on('click', logoutFn);
});


