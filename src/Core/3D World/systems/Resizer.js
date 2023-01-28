import {World} from "../World";

const setSize = (container, camera, renderer, composer) => {
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	// composer.setSize(container.clientWidth, container.clientHeight);
	// composer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
	constructor(container, camera, scene, renderer, composer) {
		// Check for if aspect ratio is narrow, and if so declare, smallSize
		// this.functionExecuted = false;

		// Set initial size
		setSize(container, camera, renderer, composer);

		window.addEventListener("resize", () => {
			// Set the size again if a resize occurs
			setSize(container, camera, renderer);
			// setSize(container, camera, renderer, composer);

			// Perform any custom actions
			this.onResize(container, scene);
		});
	}

	onResize(container, scene) {
		// const aspectRatioThreshold = 0.6; // Which is like a vertical rectangle
		// let functionExecuted = false;
		// let width = window.innerWidth;
		// let height = window.innerHeight;
		// let aspectRatio = width / height;
		// let tween;
		// let scaleValue = aspectRatio < aspectRatioThreshold ? 0.9 : 1;
		// if (aspectRatio < aspectRatioThreshold && !functionExecuted) {
		// 	functionExecuted = true;
		// 	console.log("Threshold crossed! " + scaleValue);
		// 	// console.log(aspectRatio);
		// 	// setTimeout to reset functionExecuted after a certain amount of time
		// 	setTimeout(() => {
		// 		functionExecuted = false;
		// 	}, 500);
		// }
	}
}

export {Resizer};
