import {World} from "../../World";

let initialPosition = {x: 0, y: 0, z: 0.46};
// 0, 0, 0.46;
let hasPlayed = false;

let lookAtModel;
let releaseModel;

function onMouseInAnimation(camera) {
	if (!hasPlayed) {
		// initialPosition.x = camera.position.x;
		// initialPosition.y = camera.position.y;
		// initialPosition.z = camera.position.z;
		hasPlayed = true;
	}

	// Cancel Mouse Out animations
	if (releaseModel) {
		releaseModel.stop();
	}

	lookAtModel = new TWEEN.Tween(camera.position)
		.to(
			{
				x: 0.0,
				y: 0.0,
				z: 0.5,
			},
			800
		)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.start();

	lookAtModel.onComplete((camera) => {
		world.controls.enabled = true;
		document.body.style.cursor = "grab";
	});
}

function onMouseOutAnimation(camera) {
	// Cancel Mouse in animations
	if (lookAtModel) {
		lookAtModel.stop();
	}

	releaseModel = new TWEEN.Tween(camera.position)
		.to(
			{
				x: initialPosition.x,
				y: initialPosition.y,
				z: initialPosition.z,
				// x: -0.205,
				// y: -0.246,
				// z: 0.46,
			},
			500
		)
		.easing(TWEEN.Easing.Cubic.Out)
		.start();
	// console.log(initialPosition.x);

	// lookAtModel.start();
}

export {onMouseInAnimation, onMouseOutAnimation};
