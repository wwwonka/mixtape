import {Howl} from "howler";

// let btn = document.querySelector('[title="play-pause"]');
let btn = document.getElementById("play-button");
let mixtape;

const song = document.getElementById("song");
const btnSound = new Howl({
	src: ["audio/cassette-play.mp3"],
	preload: true,
});

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

function setPlayButton(world) {
	// This will ensure that button is always in focus, thus that the spacebar will always play/pause the song
	document.body.addEventListener("mousedown", (e) => {
		e.preventDefault();
		setMediaSessionActions();
		setMediaSessionMetadata();
	});
	mixtape = world.scene.getObjectByName("mixtape");
	btn.addEventListener("click", clickHandler, true);
	// document.addEventListener("keydown", spaceBarDownHandler, true);
	// document.addEventListener("keyup", spaceBarUpHandler, true);
	return btn;
}

function PLAY() {
	if (navigator.vibrate) {
		navigator.vibrate(5);
	}
	btnSound.play();
	song.play();
	mixtape.playAnim();
}

function PAUSE() {
	if (navigator.vibrate) {
		navigator.vibrate(5);
	}
	btnSound.play();
	song.pause();
	mixtape.pauseAnim();
}

function setMediaSessionActions() {
	mixtape = world.scene.getObjectByName("mixtape");
	const skipTime = 30; // Time to skip in seconds

	const actionHandlers = [
		[
			"play",
			() => {
				btn.classList.add("active");
				// mixtape.playAnim();
				PLAY();
				setMediaSessionActions();
			},
		],
		[
			"pause",
			() => {
				btn.classList.remove("active");
				PAUSE();
				setMediaSessionActions();
			},
		],
		[
			"stop",
			() => {
				btn.classList.remove("active");
				PAUSE();
				song.currentTime = 0;
				mixtape.pauseAnim();
				setMediaSessionActions();
			},
		],
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
		[
			"seekbackward",
			(details) => {
				// const skipTime = details.seekOffset || defaultSkipTime;
				song.currentTime = Math.min(
					song.currentTime - skipTime,
					song.duration
				);
			},
		],
		[
			"seekforward",
			(details) => {
				// const skipTime = details.seekOffset || defaultSkipTime;
				song.currentTime = Math.min(
					song.currentTime + skipTime,
					song.duration
				);
			},
		],
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

	// Stop the mixtape and go back to beginning when the song is over
	song.addEventListener("ended", function () {
		btn.classList.remove("active");
		PAUSE();
		song.currentTime = 0;
		mixtape.pauseAnim();
		setMediaSessionActions();
	});

	// Press play-pause button if spacebar is pressed
}

function setMediaSessionMetadata() {
	if ("mediaSession" in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: GLOBALS.title,
			artist: GLOBALS.artist,
			album: " ",
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
