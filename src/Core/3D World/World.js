// Code and file organisation of the 3D this.scene entirely ripped from: https://discoverthreejs.com/book/

import {loadMixtape} from "./components/mixtape/mixtape.js";
import {createCamera} from "./components/camera/camera.js";
import {createLights} from "./components/lights.js";
import {createScene} from "./components/scene.js";

import {createControls} from "./systems/controls.js";
import {createRenderer} from "./systems/renderer.js";
import {createEffectComposer} from "./systems/effectComposer.js";
import {Resizer} from "./systems/Resizer.js";
import {Loop} from "./systems/Loop.js";
import {MeshPicker} from "./systems/MeshPicker.js";

class World {
	constructor(container) {
		this.camera = createCamera();
		this.renderer = createRenderer();
		this.scene = createScene();
		this.composer = createEffectComposer(
			this.camera,
			this.renderer,
			this.scene,
			container
		);
		this.loop = new Loop(
			this.camera,
			this.scene,
			this.renderer,
			this.composer
		);
		this.meshPicker = new MeshPicker(
			this.camera,
			this.scene,
			this.renderer,
			container
		);

		container.append(this.renderer.domElement);

		this.controls = createControls(this.camera, this.renderer.domElement);

		this.lights = createLights();
		this.scene.add(
			this.lights.ambientLight,
			// this.lights.mainLight,
			this.lights.pointLight
		);

		this.loop.updatables.push(this.controls);

		const resizer = new Resizer(
			container,
			this.camera,
			this.renderer,
			this.composer
		);
	}

	async init() {
		const {mixtape} = await loadMixtape();

		// Move the target to the center of the mixtape
		this.controls.target.copy(mixtape.position);

		this.loop.updatables.push(mixtape);

		this.meshPicker.pickableObjects.push(
			mixtape.getObjectByName("mixtape_dummy")
		);

		this.meshPicker.enable();

		// this.composer.objectsToOutline.push(
		// 	mixtape.getObjectByName("mixtape_body")
		// );

		// mixtape.add(this.lights.pointLight);

		this.scene.add(mixtape);

		this.lights.mainLight.target = mixtape;

		// console.log(this.composer.passes[1]);

		// this.composer.depixelisationTween.start();
	}

	// Render single frame
	render() {
		this.composer.render(this.scene, this.camera);
		// this.renderer.render(this.scene, this.camera);
		// this.effectComposer.render();
	}

	// Animation this.loop
	start() {
		this.loop.start();
	}

	stop() {
		this.loop.stop();
	}
}

export {World};
