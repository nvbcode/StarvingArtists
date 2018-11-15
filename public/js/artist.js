let artist;

$(function () {

	startRender();

	//ARTIST PROFILE GENERATION: this section sets up the page to populate with the profile information.
	function startRender() {

		$.ajax({
			method: "GET",
			url: `/api/artists/${localStorage.id}`,
			headers: {
				"authorization": `Bearer ${localStorage.token}`
			}
		}).then(function (response) {

			artist = response;

			$('#banner').append(`Welcome, ${artist.first_name} ${artist.last_name}!`);
			$('#picBox').append(`<img id=profilePic src=${artist.profile_pic}>`);
			const demo = `<iframe width="360" height="315" src="https://www.youtube.com/embed/${artist.demo.split("/").pop()}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
			$('#specBoxTitle').append(demo);

			const reviews = artist.reviews;
			for (let i = 0; i < reviews.length; i++) {
				$('#reviewRow').append(`
			<div class="oneReview">
				<div class="rating">${reviews[i].review_rate}</div>
				<div class="comment">${reviews[i].review_body}</div>
			</div>`)
			}

		}).catch(function (err) {
			console.log("Error", err);
		});

		eventsRender();
	}

	//CREATING THE EVENTS LIST: This is a generic function that makes a list of available events. Called in PROFILE GENERATION.
	function eventsRender() {

		$.ajax({
			method: "GET",
			url: `/api/events/`,
			headers: {
				"authorization": `Bearer ${localStorage.token}`
			}
		}).then(function (events) {

			for (let i = 0; i < events.length; i++) {
				const e = events[i];
				$('#eventsBox').append(`
							<div class="oneEvent">
								<div class="eventElement">Event: ${e.venue_name}</div>
								<div class="eventElement">Offer: ${e.budget}</div>
								<div class="eventElement">City: ${e.city}</div>
								<div class="eventElement">State: ${e.state}</div>
								<div class="eventElement">Comments: ${e.additional_info}</div>
								<button class="applyButton" id="${e.id}">Apply</button>
								<div class="notice hide" id="${e.id}notice">Applied!</div>
							</div>`);
				$.ajax({
					method: "GET",
					url: `/api/events/${e.id}`,
					headers: {
						"authorization": `Bearer ${localStorage.token}`
					}
				}).then(function (applicants) {
					const idArray = [];
					for (let j = 0; j < applicants.length; j++) {
						idArray.push(applicants[j].ArtistId)
					}
					if (idArray.includes(artist.id)) {
						$(`#${e.id}notice`).removeClass("hide");
						$(`#${e.id}`).addClass("hide");
					}

				}).catch(function (error) {
					res.json({ Error: error });
				});
			}
		});
	}

	$("#eventsBox").on("click", ".applyButton", applyEvent);
	function applyEvent(event) {
		event.preventDefault();

		const eventID = parseInt($(this).attr('id'));

		const newApplicant = {
			ArtistId: artist.id,
			EventId: eventID,
			bid_win: false,
		}
		console.log("newApp", newApplicant)

		$.ajax({
			method: "POST",
			url: `/api/applicants/`,
			data: newApplicant,
			headers: {
				"authorization": `Bearer ${localStorage.token}`
			}
		}).then(function (data) {
			console.log(data);
		}).catch(function (error) {
			console.log(error);
		});

		$(`#${eventID}notice`).removeClass("hide");
		$(`#${eventID}`).addClass("hide");
	}

	const logoutFn = function (e) {
		console.log('has been clicked');
		e.preventDefault();
		localStorage.token = '';
		window.location.replace('/');
	};

	$('#logout').on('click', logoutFn);
});