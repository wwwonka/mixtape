import {World} from "./Core/3D World/World.js";
import TWEEN from "@tweenjs/tween.js";
import json from "./data.json";

let displayMode;

window.renderLoopHasStarted = false;
window.GLOBALS = {};

async function main() {
	// Check if there is a hash in URL
	// https://www.codingem.com/javascript-how-to-parse-url/
	const url = new URL(window.location.href);
	const hash = url.search;

	// remove the ? at the beginning of query string:
	let parsedHash = hash.replace("?", "");
	// for special characters, we must use:
	let decodedHash = decodeURI(parsedHash);

	// if there is no hash, set parsed hash as undefined
	if (parsedHash.length === 0) {
		parsedHash = undefined;
		console.log(
			"There are no valid recipient to this mixtape, loading default..."
		);
	} else {
		console.log("The recipient of this mixtape should be:", decodedHash);
	}
	if (json.hasOwnProperty(decodedHash)) {
		// console.log(json);
		console.log("Setting the proper assets to load");
		GLOBALS = json[decodeURI(parsedHash)];
	} else {
		console.log("We should load default assets");
		GLOBALS = json.default;
	}

	console.log(GLOBALS);

	// If not default landing page, change title of the document to title of the mixtape
	if (!GLOBALS.model === "mixtape.glb") {
		document.title = `${GLOBALS.title}`;
	}

	preventInstallPrompt();
	preventLongPressVibration();

	// Get a reference to the container element
	const container = document.querySelector("#scene-container");

	window.TWEEN = TWEEN;

	// Create a new world
	window.world = new World(container);

	// Complete async tasks
	await world.init();

	// Start the animation loop
	world.render();
	// world.start();

	if (isLocalNetwork()) {
		console.log("Serving large audio file from local network");
		document.getElementById("song").src = `audio/${GLOBALS.audio}`;
	} else {
		console.log("Serving large audio file from the internet");
		document.getElementById(
			"song"
		).src = `https://github.com/wwwonka/mixtape/raw/main/assets/audio/${GLOBALS.audio}`;
	}
	document.getElementById("song").load();
}

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

const debounce = (func, wait) => {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

// See: https://web.dev/window-controls-overlay/
if ("windowControlsOverlay" in navigator) {
	navigator.windowControlsOverlay.ongeometrychange = debounce((e) => {
		if (!navigator.windowControlsOverlay.visible) {
			displayMode = "standalone";

			document
				.getElementsByClassName("pwa-title-bar")[0]
				.classList.add("hidden");
		} else {
			displayMode = "window-controls-overlay";
			document
				.getElementsByClassName("pwa-title-bar")[0]
				.classList.remove("hidden");
		}
	}, 250);
}

function isLocalNetwork(hostname = window.location.hostname) {
	return (
		["localhost", "127.0.0.1", "", "::1"].includes(hostname) ||
		hostname.startsWith("192.168.") ||
		hostname.startsWith("10.0.") ||
		hostname.endsWith(".local")
	);
}

function preventLongPressVibration() {
	document
		.getElementById("scene-container")
		.addEventListener("touchstart", (event) => {
			event.preventDefault();
		});
}
