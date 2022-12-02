import {World} from "./World/World.js";
import TWEEN from "@tweenjs/tween.js";

import testBrowserFeatures from "./Utils/tests/testFeatures.js";
import {detectDisplayMode} from "./PWA/tests/displayMode.js";
import {observeAppInstalled} from "./PWA/observers/appInstalled.js";
import {observeSessionTranser} from "./PWA/observers/sessionTransfer.js";
import {disableDevTools} from "./PWA/ui/disableDevTools";
import {observeOnlineStatus} from "./Utils/observers/onlineStatus.js";
import {registerProtocolHandler} from "./Utils/protocolHandler.js";

async function main() {
	detectDisplayMode();
	observeAppInstalled();
	observeSessionTranser();
	observeOnlineStatus();
	disableDevTools();
	registerProtocolHandler();

	document.addEventListener(
		"DOMContentLoaded",
		(event) => {
			console.log(
				"This is only a test to see how quick Cloudflare Pages build and take time propagate"
			);
			console.log("CURRENT_TIME", new Date());
			// we can move only if we are not in a browser's tab
			let isBrowser = matchMedia("(display-mode: browser)").matches;
			if (!isBrowser) {
				window.moveTo(
					window.screen.availWidth / 2,
					window.screen.availHeight / 2
				);
				window.resizeTo(800, 600);
			}
			setTimeout(() => {
				window.resizeTo(
					window.screen.availWidth / 2,
					window.screen.availHeight / 2
				);
			});
		},
		500
	);

	// testBrowserFeatures();
	// listenKeyboardShorcuts();
	// Get a reference to the container element
	const container = document.querySelector("#scene-container");

	window.TWEEN = TWEEN;

	// Create a new world
	const world = new World(container);

	// Complete async tasks
	await world.init();

	// Start the animation loop
	world.start();
}

main().catch((err) => {
	console.error(err);

	// Ready
	player.addListener("ready", ({device_id}) => {
		console.log("Ready with Device ID", device_id);
	});

	// Not Ready
	player.addListener("not_ready", ({device_id}) => {
		console.log("Device ID has gone offline", device_id);
	});
});
