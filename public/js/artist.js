//THIS IS ALL TEST DATA: ONCE THE FRONT AND BACK ARE LINKED, EVERYTHING BETWEEN THIS AND [END: DELETE ALL] WILL BE REMOVED.

	//NOTE: we could create our own validation system by including a column randomly generated, but unique alphanumeric sequences. We could
	// then pass this forward along with each request and send it back with each post with no worries because the odds of anyone being able 
	// to accurately recreate another sequence as simple as 5 numbers and 3 letters) (i.e. 10^5 * 24^3 possibilities) is very low. 

	//[REQUEST]: GET info from database by [id].

	const testArtist = {
		id: 42,
		firstName: "Bob",
		lastName: "Bobberson",
		profilePic: "https://i.ytimg.com/vi/chQmIQcWcO0/hqdefault.jpg",
		artType: "Musician",
		specialties: [
			"smooth jazz sax",
			"sexy jazz sax",
			"sweet jazz sax for the soul"
		],
		//[REQUEST]: linked to [reviews] table. No actual request should be needed.
		reviews: [
			{
				rating: 5,
				comment: "His jazz is smooth."

			},
			{
				rating: 5,
				comment: "His jazz is sexy."
			},
			{
				rating: 1,
				comment: "His jazz does nothing for my soul."
			}
		],
		//[REQUEST]: linked to [events] table. No actual request should be needed.
		applications: [
			22
		]
	}

	//[REQUEST]: GET list of events from [events] table based on [artist] type.
	const eventsList = [
		{
			id: 10,
			eventName: "Fluffy's Birthday Party",
			zipcode: "90210",
			price: 500,
			state: "AK",
			artType: "Musician",
			comments: "I want Fluffy's birthday party to be special. He loves Ray Charles, so I'm hoping for someone that plays like that.",
		},
		{
			id: 22,
			eventName: "Bar Mitzvah Bash",
			zipcode: "19405",
			price: 15,
			state: "NJ",
			artType: "Musician",
			comments: "We need something cheap.",
		},
		{
			id: 37,
			eventName: "Birth of the Antichrist",
			zipcode: "10036",
			price: 666,
			state: "NY",
			artType: "Musician",
			comments: "Praise required for the advent of armageddon",
		},
		{
			id: 99,
			eventName: "The Annexation of Poland",
			zipcode: "99999",
			price: 1500,
			state: "WS",
			artType: "Artist",
			comments: "Need a painter to create a commemorative piece for this great day.",
		}
	]
	//[END: DELETE ALL]

$(function () {

	//PROFILE GENERATION: this section sets up the page to populate with the profile information.
	function startRender() {

		// $.get('/api/profile/42') -- i.e. getting data based on the unique identifier.
		// 	.then(function (profile){}

		//[REQUEST]: GET [profile]. In the actual code: 
		// 1. the test stuff above will be removed,
		// 2. the code below will go into the {} of the .then request above, and 
		// 3. testArtist in the code below will be replaced with the [profile] argument seen above. Or vice versa. It's all good.

		$('#banner').append(`Welcome, ${testArtist.firstName} ${testArtist.lastName}!`);
		$('#picBox').append(`<img id=profilePic src=${testArtist.profilePic}>`);

		const specialties = testArtist.specialties;
		for (let i = 0; i < specialties.length; i++) {
			$('#specialtiesBox').append(`<div class="specialtyItem">${specialties[i]}</div>`)
		}

		const reviews = testArtist.reviews;
		for (let i = 0; i < specialties.length; i++) {
			$('#reviewRow').append(`
			<div class="oneReview">
				<div class="rating">${reviews[i].rating}</div>
				<div class="comment">${reviews[i].comment}</div>
			</div>`)
		}

		eventsRender();
	}

	startRender();

//CREATING THE EVENTS LIST: This is a generic function that makes a list of available events. Called in PROFILE GENERATION.
function eventsRender() {

		// $.get('/api/events')
		// 	.then(function (events){}

		//[REQUEST]: GET [profile]. In the actual code: 
		// 1. the test stuff above will be removed,
		// 2. the code below will go into the {} of the .then request above, and 
		// 3. eventsList in the code below will be replaced with the [events] argument seen above. Or vice versa. It's all good.


	for (i = 0; i < eventsList.length; i++) {
		const e = eventsList[i];
		if (e.artType === testArtist.artType)


		$('#eventsBox').append(`
			<div class="oneEvent">
				<div class="eventElement">Event: ${e.eventName}</div>
				<div class="eventElement">Offer: ${e.price}</div>
				<div class="eventElement">Zipcode: ${e.zipcode}</div>
				<div class="eventElement">State: ${e.state}</div>
				<div class="eventElement">Comments: ${e.comments}</div>
				<button class="applyButton" id="${e.id}">Apply</button>
				<div class="notice hide" id="${e.id}notice">Applied!</div>
			</div>
		`)
	}

	for (i = 0; i < eventsList.length; i++) {
		const e = eventsList[i]
		if (testArtist.applications.includes(e.id)) {
			$(`#${e.id}notice`).removeClass("hide");
			$(`#${e.id}`).addClass("hide");
		}
	}
}
	
	$("#eventsBox").on("click", ".applyButton", applyEvent);
	function applyEvent(event) {
		event.preventDefault();

		const eventID = parseInt($(this).attr('id'));

		testArtist.applications.push(eventID);
		$(`#${eventID}notice`).removeClass("hide");
		$(`#${eventID}`).addClass("hide");
	}
})
