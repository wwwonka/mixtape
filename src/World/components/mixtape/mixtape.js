import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {DoubleSide, MathUtils} from "three";

import {setupModel} from "./setupModel.js";

async function loadMixtape() {
	const loader = new GLTFLoader();

	const [mixtapeData] = await Promise.all([
		loader.loadAsync("models/mixtape_optimized.glb"),
	]);

	// console.log("Mixtape loaded!", mixtapeData);

	const mixtape = setupModel(mixtapeData);

	mixtape.children[2].children[0].material.side = DoubleSide;
	console.log(mixtape);

	// const radiansPerSecond = MathUtils.degToRad(2);
	// // // this method will be called once per frame
	// mixtape.tick = (delta) => {
	// 	// increase the cube's rotation each frame
	// 	if (mixtape.rotation.x <= MathUtils.degToRad(4.1)) {
	// 		mixtape.rotation.z += radiansPerSecond * delta;
	// 		mixtape.rotation.x += radiansPerSecond * delta;
	// 		mixtape.rotation.y += radiansPerSecond * delta;
	// 	}
	// };

	return {
		mixtape,
	};
}

export {loadMixtape};
