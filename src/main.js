import {World} from "./World/World.js";
// import testBrowserFeatures from "./Features/testFeatures.js";
// import {listenKeyboardShorcuts} from "./Observers/keyboardShortcuts.js";

async function main() {
	// testBrowserFeatures();
	// listenKeyboardShorcuts();
	// Get a reference to the container element
	const container = document.querySelector("#scene-container");

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
