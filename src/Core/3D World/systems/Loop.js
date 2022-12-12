import {Clock} from "three";
import {ceilPowerOfTwo} from "three/src/math/MathUtils";

const clock = new Clock();

class Loop {
	constructor(camera, scene, renderer, composer) {
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
		this.composer = composer;
		this.updatables = [];
	}

	start() {
		this.tick();
		this.composer.render(this.scene, this.camera);

		requestAnimationFrame(() => {
			this.start();
		});
		// this.renderer.setAnimationLoop((time) => {
		// 	// Tell every animated object to tick forward one frame
		// 	this.tick();

		// 	// Render a frame
		// 	this.composer.render(this.scene, this.camera);
		// 	// this.renderer.render(this.scene, this.camera);
		// });
	}

	stop() {
		this.renderer.setAnimationLoop(null);
	}

	tick(time) {
		// Only call the getDelta function once per frame!
		const delta = clock.getDelta();

		// Update
		TWEEN.update(time);
		// console.log(
		//   `The last frame rendered in ${delta * 1000} milliseconds`,
		// );

		for (const object of this.updatables) {
			object.tick(delta);
		}
	}
}

export {Loop};
