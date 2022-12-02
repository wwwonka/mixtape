import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js";
import {DoubleSide, MathUtils} from "three";
import {onMouseInAnimation, onMouseOutAnimation} from "./setupAnimations.js";
import {TWEEN} from "@tweenjs/tween.js/dist/tween.umd";

import {setupModel} from "./setupModel.js";

async function loadMixtape() {
	// const dracoLoader = new DRACOLoader();
	const loader = new GLTFLoader();

	// dracoLoader.setDecoderPath("../../../Utils/loaders/draco/");

	// loader.setDRACOLoader(dracoLoader);

	const [mixtapeData] = await Promise.all([
		loader.loadAsync("models/mixtape_dummy.glb"),
	]);

	const mixtape = setupModel(mixtapeData);

	console.log(mixtape);

	mixtape.onMouseIn = () => {
		onMouseInAnimation(mixtape);
	};

	mixtape.onMouseOut = () => {
		onMouseOutAnimation(mixtape);
	};

	//Make mixtape_dummy invisible
	mixtape.getObjectByName("mixtape_dummy").visible = false;

	// Make mixtape material visible on the inside
	mixtape.getObjectByName("mixtape_body_1").material.side = DoubleSide;

	return {
		mixtape,
	};
}

export {loadMixtape};
