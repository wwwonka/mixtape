import {World} from "./Core/3D World/World.js";
import TWEEN from "@tweenjs/tween.js";

let displayMode;

async function main() {
	preventInstallPrompt();
	// displayPwaTitleBar();

	// Get a reference to the container element
	const container = document.querySelector("#scene-container");

	window.TWEEN = TWEEN;

	// Create a new world
	window.world = new World(container);

	// Complete async tasks
	await world.init();

	// Start the animation loop
	world.start();

	// container.style.filter = "opacity(100%)";
}

// document.addEventListener("DOMContentLoaded", () => {});

window.onload = main().catch((err) => {
	console.error(err);
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

// function displayPwaTitleBar() {
// 	if ("windowControlsOverlay" in navigator) {
// 		// Window Controls Overlay is supported.
// 		console.log("window control overlay supported");

// 		if (navigator.windowControlsOverlay.visible) {
// 			console.log("window control overlay visible");

// 			// The window controls overlay is visible in the title bar area.
// 			document.getElementsByClassName("pwa-title-bar")[0].style.display =
// 				"default";
// 		} else {
// 			console.log("window control overlay not visible");
// 			// console.log(document.getElementsByClassName("pwa-title-bar")[0]);
// 			document.getElementsByClassName("pwa-title-bar")[0].style.display =
// 				"default";
// 		}
// 		// document.getElementById("pwa-title-bar").style.display = "default";
// 	}
// }

window.addEventListener("DOMContentLoaded", () => {
	// 1. Lets assume this is a browser tab
	displayMode = "browser tab";
	// 2. Check if it is opened as a PWA
	if (window.matchMedia("(display-mode: standalone)").matches) {
		// App was opened as standalone
		displayMode = "standalone";
		// document
		// 	.getElementsByClassName("pwa-title-bar")[0]
		// 	.classList.add("hidden");
	} else if (
		window.matchMedia("(display-mode: window-controls-overlay)").matches
	) {
		displayMode = "window-controls-overlay";
		document
			.getElementsByClassName("pwa-title-bar")[0]
			.classList.remove("hidden");
	}
	// Log launch display mode to analytics
	else console.log("DISPLAY_MODE_LAUNCH:", displayMode);
});

// See: https://web.dev/learn/pwa/enhancements/#detecting-a-pwa-on-apple-mobile-platforms
if (navigator.standalone === true) {
	displayMode = standalone_iOS;
	console.log("opned as a PWA on iOS");
	// document.getElementsByClassName("pwa-title-bar")[0].style.display = "none";
}

// See: https://web.dev/window-controls-overlay/
if ("windowControlsOverlay" in navigator) {
	navigator.windowControlsOverlay.ongeometrychange = (e) => {
		console.log("Window control overlay toggle");

		if (displayMode === "standalone") {
			console.log(displayMode + "!");
			displayMode = "window-controls-overlay";
			document
				.getElementsByClassName("pwa-title-bar")[0]
				.classList.remove("hidden");
		} else if (displayMode === "window-controls-overlay") {
			console.log(displayMode);
			displayMode = "standalone";
			document
				.getElementsByClassName("pwa-title-bar")[0]
				.classList.add("hidden");
		}
	};
}
