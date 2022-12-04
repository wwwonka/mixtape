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
