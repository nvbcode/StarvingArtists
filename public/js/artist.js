let artist;

$(function () {

	startRender();

	//ARTIST PROFILE GENERATION: this section sets up the page to populate with the profile information.
	function startRender() {

		// $.get('/api/profile/427') -- i.e. getting data based on the unique identifier.
		// 	.then(function (profile){}
		$.ajax({
			method: "GET",
			url: `/api/artists/${localStorage.id}`,
			headers: {
				"authorization": `Bearer ${localStorage.token}`
			}
		}).then(function (response) {

			artist = response;

			//[REQUEST]: GET [profile]. In the actual code: 
			// 1. the test stuff above will be removed,
			// 2. the code below will go into the {} of the .then request above, and 
			// 3. [testArtist] in the code below will be replaced with the [profile] argument seen above. Or vice versa. It's all good.
			// 4. May need to add a return command in to make data accessible to click functions. Or maybe just create a universal variable?
			$('#banner').append(`Welcome, ${artist.first_name} ${artist.last_name}!`);
			$('#picBox').append(`<img id=profilePic src=${artist.profile_pic}>`);

			// const specialties = testArtist.specialties;
			// for (let i = 0; i < specialties.length; i++) {
			// 	$('#specialtiesBox').append(`<div class="specialtyItem">${specialties[i]}</div>`)
			// }

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

			console.log("events", events);

			//[REQUEST]: GET [events]. In the actual code: 
			// 1. the test stuff above will be removed,
			// 2. the code below will go into the {} of the .then request above, and 
			// 3. the [events] variabls below should correspond to the [events] argument that will be passed in.
			// 4. May need to add a return command in to make data accessible to click functions. Or maybe just create a universal variable?
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
		// console.log(eventID);
		// testArtist.applications.push(eventID);
		// $.put('/api/profile/427')
		//[REQUEST]: PUT [eventID]. In the actual code: 
		// 1. the test stuff above will be removed, but we somehow still need to reference the object [testArtist].
		//		NOTE: may end up reconstructing the whole thing with a return or just create a global-scale variabe (i.e. where the test
		//		information currently sits.)
		//		Since we're only pushing a single new piece of informat	ion, a global variable would probably be easy.
		const newApplicant = {
			ArtistId: artist.id,
			EventId: eventID,
			bid_win: false,
		}
		console.log("newApp", newApplicant)
		//Create a new Applicant table row and add artist ID and event ID in the row
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
		// const eventIDList = [];
		// for (let i = 0; i < events.length; i++) {
		// 	eventIDList.push(events[i].id);
		// }

		// const index = eventIDList.indexOf(eventID);
		// events[index].applicants.push(testArtist.id);

		// $.put('/api/events/${eventID}')
		//[REQUEST]: PUT [events]. In the actual code: 
		// 1. the test stuff above will be removed, but we somehow still need to reference the object [events].
		//		NOTE: may end up reconstructing the whole thing with a return or just create a global-scale variabe (i.e. where the test
		//		information currently sits.)
		//		Since we're only pushing, a global variable would probably be easy.

		$(`#${eventID}notice`).removeClass("hide");
		$(`#${eventID}`).addClass("hide");
	}
});