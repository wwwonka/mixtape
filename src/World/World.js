import {loadMixtape} from "./components/mixtape/mixtape.js";
import {createCamera} from "./components/camera.js";
import {createLights} from "./components/lights.js";
import {createScene} from "./components/scene.js";

import {createControls} from "./systems/controls.js";
import {createRenderer} from "./systems/renderer.js";
import {Resizer} from "./systems/Resizer.js";
import {Loop} from "./systems/Loop.js";

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
	constructor(container) {
		camera = createCamera();
		renderer = createRenderer();
		scene = createScene();
		loop = new Loop(camera, scene, renderer);
		container.append(renderer.domElement);
		controls = createControls(camera, renderer.domElement);

		const {ambientLight, mainLight} = createLights();

		loop.updatables.push(controls);
		scene.add(ambientLight, mainLight);

		const resizer = new Resizer(container, camera, renderer);
	}

	async init() {
		const {mixtape} = await loadMixtape();

		// Move the target to the center of the mixtape
		controls.target.copy(mixtape.position);

		loop.updatables.push(mixtape);

		scene.add(mixtape);
	}

	// Render single frame
	render() {
		renderer.render(scene, camera);
	}

	// Animation loop
	start() {
		loop.start();
	}

	stop() {
		loop.stop();
	}
}

export {World};
