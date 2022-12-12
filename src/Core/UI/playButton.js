import {Howl, Howler} from "howler";

let btn = document.querySelector('[title="play-pause"]');
// let hasClicked = false;

const song = document.getElementById("song");
const btnSound = new Howl({
	src: ["audio/cassette-play.mp3"],
	autoplay: false,
	preload: true,
	// autoplay: false,
	// rate: 0.5,
});

// const btnSound2 = new Audio("./audio/cassette-play.wav");
// const btnSound = document.getElementById("play-fx");

function clickHandler() {
	// If button is active, PAUSE icon will display on button

	btn.classList.toggle("active");

	// Set Media Session stuff
	setMediaSessionActions();
	setMediaSessionMetadata();

	if (btn.classList.contains("active")) {
		// Play song
		PLAY();
	} else {
		// Pause song
		PAUSE();
	}
}
function setPlayButton() {
	btn.addEventListener("click", clickHandler, true);
	return btn;
}

function PLAY() {
	if (navigator.vibrate) {
		navigator.vibrate(5);
	}
	btnSound.play();
	song.play();
	// setTimeout(() => song.play(), 600);
}

function PAUSE() {
	if (navigator.vibrate) {
		navigator.vibrate(5);
	}
	btnSound.play();
	song.pause();
}

function setMediaSessionActions() {
	// console.log("Setting Up Media Session...");
	const mixtape = world.scene.getObjectByName("mixtape");

	const actionHandlers = [
		[
			"play",
			() => {
				btn.classList.add("active");
				mixtape.playAnim();
				PLAY();
			},
		],
		[
			"pause",
			() => {
				// console.log("PAUSE FROM MEDIA SESSION");
				btn.classList.remove("active");
				PAUSE();
				mixtape.pauseAnim();
				setMediaSessionActions();
			},
		],
		// [
		// 	"stop",
		// 	() => {
		// 		btn.classList.remove("active");
		// 		song.pause();
		// 		// song.currentTime = 0;
		// 		/* ... */
		// 	},
		// ],
		// [
		// 	"previoustrack",
		// 	() => {
		// 		console.log("PREVIOUS");
		// 		song.pause();
		// 		song.currentTime = 0;
		// 		song.play();
		// 	},
		// ],
		// ["nexttrack", null],
		// [
		// 	"seekbackward",
		// 	(details) => {
		// 		const skipTime = details.seekOffset || defaultSkipTime;
		// 		song.currentTime = Math.min(
		// 			song.currentTime - skipTime,
		// 			song.duration
		// 		);
		// 	},
		// ],
		// [
		// 	"seekforward",
		// 	(details) => {
		// 		const skipTime = details.seekOffset || defaultSkipTime;
		// 		song.currentTime = Math.min(
		// 			song.currentTime + skipTime,
		// 			song.duration
		// 		);
		// 	},
		// ],
		// [
		// 	"seekto",
		// 	(details) => {
		// 		if (details.fastSeek && "fastSeek" in video) {
		// 			// Only use fast seek if supported.
		// 			song.fastSeek(details.seekTime);
		// 			return;
		// 		}
		// 		song.currentTime = details.seekTime;
		// 		// TODO: Update playback state.
		// 	},
		// ],

		/* Video conferencing actions */
		// ["togglemicrophone", null],
		// ["togglecamera", null],
		// ["hangup", null],
	];

	for (const [action, handler] of actionHandlers) {
		try {
			navigator.mediaSession.setActionHandler(action, handler);
		} catch (error) {
			console.log(
				`The media session action "${action}" is not supported yet.`
			);
		}
	}
}

function setMediaSessionMetadata() {
	if ("mediaSession" in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: "TITLE",
			artist: "ARTIST",
			album: "ALBUM",
			artwork: [
				{
					src: "icons/media-session/96.png",
					sizes: "96x96",
					type: "image/png",
				},
				{
					src: "icons/media-session/128.png",
					sizes: "128x128",
					type: "image/png",
				},
				{
					src: "icons/media-session/192.png",
					sizes: "192x192",
					type: "image/png",
				},
				{
					src: "icons/media-session/256.png",
					sizes: "256x256",
					type: "image/png",
				},
				{
					src: "icons/media-session/384.png",
					sizes: "384x384",
					type: "image/png",
				},
				{
					src: "icons/media-session/512.png",
					sizes: "512x512",
					type: "image/png",
				},
			],
		});
	}
}

export {setPlayButton};
