import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {DoubleSide} from "three";

import {setupModel} from "./setupModel.js";

async function loadMixtape() {
	const loader = new GLTFLoader();

	const [mixtapeData] = await Promise.all([
		loader.loadAsync("/models/mixtape.glb"),
	]);

	console.log("Mixtape loaded!", mixtapeData);

	const mixtape = setupModel(mixtapeData);
	mixtape.position.set(0, 0, 0);
	mixtape.rotation.set(0, 0, 0);

	mixtape.children[1].material.side = DoubleSide;

	return {
		mixtape,
	};
}

export {loadMixtape};
