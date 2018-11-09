$(function () {
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
		applications: [
			2
		]
	}

	const eventsList = [
		{
			id: 1,
			eventName: "Fluffy's Birthday Party",
			zipcode: "90210",
			price: 500,
			state: "AK",
			artist: "Musician",
			comments: "I want Fluffy's birthday party to be special. He loves Ray Charles, so I'm hoping for someone that plays like that.",
		},
		{
			id: 2,
			eventName: "Bar Mitzvah Bash",
			zipcode: "19405",
			price: 15,
			state: "NJ",
			artist: "Musician",
			comments: "We need something cheap.",
		},
		{
			id: 3,
			eventName: "Birth of the Antichrist",
			zipcode: "10036",
			price: 666,
			state: "NY",
			artist: "Musician",
			comments: "Praise required for the advent of armageddon",
		}
	]

	function eventsRender(dataList) {

		for (i = 0; i < dataList.length; i++) {
			$('#eventsBox').append(`
		<div class="oneEvent">
			<div class="eventElement">Event: ${dataList[i].eventName}</div>
			<div class="eventElement">Type: ${dataList[i].artist}</div>
			<div class="eventElement">Offer: ${dataList[i].price}</div>
			<div class="eventElement">Zipcode: ${dataList[i].zipcode}</div>
			<div class="eventElement">State: ${dataList[i].state}</div>
			<div class="eventElement">Comments: ${dataList[i].comments}</div>
			<button class="applyButton" id="${dataList[i].id}">Apply</button>
			<div class="notice hide" id="${dataList[i].id}notice">Applied!</div>
		</div>
	`)
		}
		for (i = 0; i < dataList.length; i++) {
			if (testArtist.applications.includes(dataList[i].id)) {
				$(`#${dataList[i].id}notice`).removeClass("hide");
				$(`#${dataList[i].id}`).addClass("hide");
			}
		}
	}

	function startRender() {
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

		eventsRender(eventsList);
	}

	startRender();

	$("#eventsBox").on("click", ".applyButton", applyEvent);
	function applyEvent(event) {
		event.preventDefault();

		const eventID = parseInt($(this).attr('id'));

		testArtist.applications.push(eventID);
		$(`#${eventID}notice`).removeClass("hide");
		$(`#${eventID}`).addClass("hide");
	}
})
