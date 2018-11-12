//THIS IS ALL TEST DATA: ONCE THE FRONT AND BACK ARE LINKED, EVERYTHING BETWEEN THIS AND [END: DELETE ALL] WILL BE REMOVED.

//NOTE: in the text data, all users IDs are 3 digits. All event IDs are 2 digits.

//Adding YouTube parser function to display iFrame after ajax call
const getYouTube=function(url){
    let youtube=url;
    youtube=youtube.substring(32);
    console.log(youtube);
    const iFrame=`<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtube}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    console.log(iFrame);
    return iFrame
}

//getYouTube('https://www.youtube.com/watch?v=ZjRX-PL7pC4');





//[REQUEST]: GET info from database by artist's [id]. See the function startRender();
const testArtist = {
	id: 427,
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
	//NOTE: all [applications] arrays will initially be empty. This 22 is just in here for testing purposes (i.e. does the button disappear if
	//the event ID is already stored).
	applications: [
		22
	]
}

//[REQUEST]: GET list of events from [events] table based on [artist] type. See the event eventsRender.
//NOTE: the array [applicants] may not need to be stored directly here, but each event does need to track which artists applied to it.
//NOTE: all applicants will initially be empty. This 427 is just in here for testing purposes.
const events = [
	{
		id: 10,
		eventName: "Fluffy's Birthday Party",
		zipcode: "90210",
		price: 500,
		state: "AK",
		artType: "Musician",
		comments: "I want Fluffy's birthday party to be special. He loves Ray Charles, so I'm hoping for someone that plays like that.",
		creator: 234,		//Tied to the "GenericPerson" client profile.
		applicants: []
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
	},
	{
		id: 37,
		eventName: "Birth of the Antichrist",
		zipcode: "10036",
		price: 666,
		state: "NY",
		artType: "Musician",
		comments: "Praise required for the advent of armageddon",
		creator: 962,	 	//Not actually tied to anything, but every event needs to be tied to a client profile.
		applicants: []
	},
	{
		id: 99,
		eventName: "The Annexation of Poland",
		zipcode: "99999",
		price: 1500,
		state: "WS",
		artType: "Artist",
		comments: "Need a painter to create a commemorative piece for this great day.",
		creator: 484,		//Not actually tied to anything, but every event needs to be tied to a client profile.
		applicants: []
	}
]
//[END: DELETE ALL]

$(function () {

	startRender();

	//ARTIST PROFILE GENERATION: this section sets up the page to populate with the profile information.
	function startRender() {

		// $.get('/api/profile/427') -- i.e. getting data based on the unique identifier.
		// 	.then(function (profile){}

		//[REQUEST]: GET [profile]. In the actual code: 
		// 1. the test stuff above will be removed,
		// 2. the code below will go into the {} of the .then request above, and 
		// 3. [testArtist] in the code below will be replaced with the [profile] argument seen above. Or vice versa. It's all good.
		// 4. May need to add a return command in to make data accessible to click functions. Or maybe just create a universal variable?
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

	//CREATING THE EVENTS LIST: This is a generic function that makes a list of available events. Called in PROFILE GENERATION.
	function eventsRender() {

		// $.get('/api/events')
		// 	.then(function (events){}

		//[REQUEST]: GET [events]. In the actual code: 
		// 1. the test stuff above will be removed,
		// 2. the code below will go into the {} of the .then request above, and 
		// 3. the [events] variabls below should correspond to the [events] argument that will be passed in.
		// 4. May need to add a return command in to make data accessible to click functions. Or maybe just create a universal variable?
		for (i = 0; i < events.length; i++) {
			const e = events[i];
			if (e.artType === testArtist.artType) {
				$('#eventsBox').append(`
					<div class="oneEvent">
						<div class="eventElement">Event: ${e.eventName}</div>
						<div class="eventElement">Offer: ${e.price}</div>
						<div class="eventElement">Zipcode: ${e.zipcode}</div>
						<div class="eventElement">State: ${e.state}</div>
						<div class="eventElement">Comments: ${e.comments}</div>
						<button class="applyButton" id="${e.id}">Apply</button>
						<div class="notice hide" id="${e.id}notice">Applied!</div>
					</div>`)
			}
		}

		for (i = 0; i < events.length; i++) {
			const e = events[i]
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
})