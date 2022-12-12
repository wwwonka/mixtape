import {setPlayButton} from "./Core/UI/playButton.js";
import {World} from "./Core/3D World/World.js";
import TWEEN from "@tweenjs/tween.js";

async function main() {
	// document.getElementById("body").addEventListener("touchstart", (e) => {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// });

	preventInstallPrompt();
	displayPwaTitleBar();

	// Get a reference to the container element
	const container = document.querySelector("#scene-container");

	window.TWEEN = TWEEN;

	// Create a new world
	window.world = new World(container);

	// Complete async tasks
	await world.init();

	// Start the animation loop
	world.start();

	const playButton = setPlayButton(world);

	setTimeout(() => {
		playButton.classList.remove("hide");
	}, 1000);
}

document.addEventListener("DOMContentLoaded", () => {});

window.onload = main().catch((err) => {
	console.error(err);

	// Ready
	// player.addListener("ready", ({device_id}) => {
	// 	console.log("Ready with Device ID", device_id);
	// });

	// Not Ready
	// player.addListener("not_ready", ({device_id}) => {
	// 	console.log("Device ID has gone offline", device_id);
	// });
});

function preventInstallPrompt() {
	// This variable will save the event for later use.
	let deferredPrompt;
	window.addEventListener("beforeinstallprompt", (e) => {
		// Prevents the default mini-infobar or install dialog from appearing on mobile
		e.preventDefault();
		// Save the event because you'll need to trigger it later.
		deferredPrompt = e;
		// Show your customized install prompt for your PWA
		// Your own UI doesn't have to be a single element, you
		// can have buttons in different locations, or wait to prompt
		// as part of a critical journey.

		// showInAppInstallPromotion();
	});
}

function displayPwaTitleBar() {
	if ("windowControlsOverlay" in navigator) {
		// Window Controls Overlay is supported.
		console.log("window control overlay supported");

		if (navigator.windowControlsOverlay.visible) {
			console.log("window control overlay visible");
			// The window controls overlay is visible in the title bar area.
		} else {
			console.log("window control overlay not visible");
			console.log(document.getElementsByClassName("pwa-title-bar")[0]);
			document.getElementsByClassName("pwa-title-bar")[0].style.display =
				"none";
		}
		// document.getElementById("pwa-title-bar").style.display = "default";
	}
}
