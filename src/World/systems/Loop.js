import {Clock} from "three";

const clock = new Clock();

class Loop {
	constructor(camera, scene, renderer) {
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
		this.updatables = [];
	}

	start() {
		this.renderer.setAnimationLoop((time) => {
			// Tell every animated object to tick forward one frame
			this.tick();

			// Render a frame
			this.renderer.render(this.scene, this.camera);
		});
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
