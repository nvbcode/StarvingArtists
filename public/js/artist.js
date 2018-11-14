$(function () {

	let artist;

	startRender();

	//ARTIST PROFILE GENERATION: this section sets up the page to populate with the profile information.
	function startRender() {

		//REPLACE 9 WITH A TEMPLATE LITERAL REFERENCING THE TOKEN.
		$.get("/api/artists/9")
			.then(function (id) {

				$('#banner').append(`Welcome, ${id.first_name} ${id.last_name}!`);
				$('#picBox').append(`<img id=profilePic src=${id.profile_pic}>`);

				//NEED TO PUT IN A SPECIALTIES TABLE.
				const specs = id.specialties;
				for (let i = 0; i < specss.length; i++) {
					$('#specialtiesBox').append(`<div class="specialtyItem">${specs[i]}</div>`)
				}

				const revs = id.reviews;
				for (let i = 0; i < revs.length; i++) {
					$('#reviewRow').append(`
						<div class="oneReview">
							<div class="rating">${revs[i].review_rate}</div>
							<div class="comment">${revss[i].review_body}</div>
						</div>`)
				}
				return artist = id;

			}).catch(function (err) {
				console.log("Error", err);
			});
		eventsRender();
	}

	let events;
	//CREATING THE EVENTS LIST: This is a generic function that makes a list of available events. Called in PROFILE GENERATION.
	function eventsRender() {

		$.get('/api/events')
			.then(function (data) {

				//NEED TO PUT IN ART_TYPE TYPE FOR ARTISTS AND EVENTS
				for (i = 0; i < data.length; i++) {
					if (data[i].art_type === artist.art_type) {
						$('#eventsBox').append(`
							<div class="oneEvent">
								<div class="eventElement">Event: ${data[i].event_type}</div>
								<div class="eventElement">Offer: ${data[i].budget}</div>
								<div class="eventElement" id="${data[i].id}venue">Venue: ${data[i].venue_name}</div>
								<div class="eventElement">Address: ${data[i].venue_name} ${data[i].city}, ${data[i].state}</div>
								<div class="eventElement">Comments: ${data[i].additional_info}</div>
								<button class="applyButton" id="${data[i].id}">Apply</button>
								<div class="notice hide" id="${data[i].id}notice">Applied!</div>
							</div>`);

						let applicantArray = [];
						//UNCLEAR ON HOW APPLICANT DATA IS STORED.
						for (let j = 0; data[i].applicants; i++) {
							applicantArray.push(data[i].applicants[j].artistId);
						}
						if (applicantArray.includes(artist.id)) {
							$(`#${data[i].id}notice`).removeClass("hide");
							$(`#${data.id}`).addClass("hide");
						}

					}
				}
				return events = data;
			}).catch(function (error) {
				res.json({ Error: error });
			});
	}

	$("#eventsBox").on("click", ".applyButton", applyEvent);
	function applyEvent(event) {
		event.preventDefault();

		const eventID = parseInt($(this).attr('id'));
		testArtist.applications.push(eventID);

		// $.put('/api/profile/427')
		//[REQUEST]: PUT [eventID]. In the actual code: 
		// 1. the test stuff above will be removed, but we somehow still need to reference the object [testArtist].
		//		NOTE: may end up reconstructing the whole thing with a return or just create a global-scale variabe (i.e. where the test
		//		information currently sits.)
		//		Since we're only pushing a single new piece of information, a global variable would probably be easy.

		const eventIDList = [];
		for (let i = 0; i < events.length; i++) {
			eventIDList.push(events[i].id);
		}

		const index = eventIDList.indexOf(eventID);
		events[index].applicants.push(testArtist.id);

		// $.put('/api/events/${eventID}')
		//[REQUEST]: PUT [events]. In the actual code: 
		// 1. the test stuff above will be removed, but we somehow still need to reference the object [events].
		//		NOTE: may end up reconstructing the whole thing with a return or just create a global-scale variabe (i.e. where the test
		//		information currently sits.)
		//		Since we're only pushing, a global variable would probably be easy.

		$(`#${eventID}notice`).removeClass("hide");
		$(`#${eventID}`).addClass("hide");
	}

	$('#artistChange').on("click", showArtistModal)
	function showArtistModal(event) {
		event.preventDefault();
		$('#artistSignUp').addClass("show");
	}

	$("#artistCreate").on("click", createArtist)
	function createArtist(event) {
		event.preventDefault();

		$('#artistError').removeClass("show")
		$('#apasswordError').removeClass("show")
		//VERY IMPORTANT! Currently, this event ID is being randomly generated for testing. In the actual program, this will not exist, 
		//and mySQL will take care of it.

		const p1 = $('#aPassword1').val().trim();
		const p2 = $('#aPassword2').val().trim();

		const str = $('#comments').val().trim();

		const newUser = {
			email: $('#aEmail').val().trim(),
			user_name: $('#aUserName').val().trim(),
			password: $('#aPassword2').val().trim(),
			user_type: 2
		}
		const artistData = {
			first_name: $('#aFirstName').val().trim(),
			last_name: $('#aLastName').val().trim(),
			city: $('#aCity').val().trim,
			state: $('#aState').val().trim,
			artType: $('#virtuoso').val(),
			demo: $('#youTubeURL').val.trim,
			specialties: str.split(","),
			UserID: null
		}

		if (artistData.first_name === "" || artistData.last_name === "" ||artistData.city === "" || newUser.user_name === "" || newUser.password === "") {
			$('#artistError').addClass("show")
			$('#artistError').toggleClass("alt");
		} else if (p1 != p2) {
			$('#apasswordError').addClass("show")
			$('#apasswordError').toggleClass("alt");
		} else {

			// $.put('/api/events)
			//[REQUEST]: PUT [newUser]
			//.then(function (newUser){
				// set newUser.id as foreignKey.
			//})
			console.log(newUser);

			//$.get('/api/user/id)
			//[REQUEST]: GET [user]
			//.then
			// $.put('/api/events)
			//[REQUEST]: PUT [artistData]
			//set artistData.UserID to user.ID
			console.log(artistData);

			$('#artistSignUp').removeClass("show");
			$('#apasswordError').removeClass("show")
			$('#artistError').removeClass("show")
		}
	}

	$('#artistCancel').on("click", closeArtist);
	function closeArtist(event) {
		event.preventDefault();

		$('#artistError').removeClass("show")
		$('#apasswordError').removeClass("show")

		$('#aFirstName').val("");
		$('#aLastName').val("");
		$('#aEmail').val("");
		$('#aUserName').val("");
		$('#aPassword1').val("");
		$('#aPassword2').val("");
		$('#aZipcode').val("");
		$('#aState').val("");
		$('#virtuoso').val("");
		$('#comments').val("");

		$('#artistSignUp').removeClass("show");
	}
})