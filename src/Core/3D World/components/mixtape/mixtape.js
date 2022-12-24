import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {DoubleSide} from "three";
import {onMouseInAnimation, onMouseOutAnimation} from "./setupAnimations.js";

import {setupModel} from "./setupModel.js";

async function loadMixtape() {
	const loader = new GLTFLoader();

	const [mixtapeData] = await Promise.all([
		loader.loadAsync(`models/${GLOBALS.model}`),
	]);

	const mixtape = setupModel(mixtapeData);

	// Define all interactions
	mixtape.onMouseIn = () => {
		onMouseInAnimation(mixtape);
	};

	mixtape.onMouseOut = () => {
		onMouseOutAnimation(mixtape);
	};

	console.log(mixtape);

	//Make mixtape_dummy invisible
	mixtape.getObjectByName("mixtape_dummy").visible = false;

	// Make mixtape material visible on the inside
	mixtape.getObjectByName("mixtape_body_1").material.side = DoubleSide;

	return {
		mixtape,
	};
}

export {loadMixtape};
