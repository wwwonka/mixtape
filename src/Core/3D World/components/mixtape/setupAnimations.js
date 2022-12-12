// import {TWEEN} from "@tweenjs/tween.js/dist/tween.umd";
// import {MathUtils} from "three";
// import {World} from "../../World";
// These values are the ones coming from the GLB file
const initialScale = {x: 100, y: 100, z: 110};
let initialRotation = {x: 0, y: 0, z: 0};

// Mouse in Tweens
let scaleUp;
let rotateTowardsCamera;

// Mouse out Tweens
let scaleToInitialValue;
let rotateToInitialValue;

function onMouseInAnimation(model) {
	// 1. Cancel Mouse in animations
	if (scaleToInitialValue) {
		TWEEN.remove(scaleToInitialValue);
		TWEEN.remove(rotateToInitialValue);
	}

	initialRotation = {
		x: model.rotation.x,
		y: model.rotation.y,
		z: model.rotation.z,
	};

	// const currentScale = initialScale;
	// And this is how much bigger we want to make it
	const modelScaleFactor = 1.05;

	scaleUp = new TWEEN.Tween(model.scale)
		.to(
			{
				x: initialScale.x * modelScaleFactor,
				y: initialScale.y * modelScaleFactor,
				z: initialScale.z * modelScaleFactor,
			},
			800
		)
		.easing(TWEEN.Easing.Back.InOut)
		.start();

	// scaleUp.onComplete(() => {
	world.controls.enabled = true;
	// });

	rotateTowardsCamera = new TWEEN.Tween(model.rotation)
		.to(
			{
				x: 0,
				y: 0,
				z: 0,
			},
			1000
		)
		.easing(TWEEN.Easing.Back.Out)
		.start();
}

function onMouseOutAnimation(model) {
	// 2. Cancel Mouse in animations
	scaleUp.stop();
	// TWEEN.removeAll();

	scaleToInitialValue = new TWEEN.Tween(model.scale) // Create a new tween that modifies 'coords'.
		.to(
			{
				x: initialScale.x,
				y: initialScale.y,
				z: initialScale.z,
			},
			1000
		) // Move to (300, 200) in 1 second.
		.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
		.start(); // Start the tween immediately.

	rotateToInitialValue = new TWEEN.Tween(model.rotation) // Create a new tween that modifies 'coords'.
		.to(
			{
				x: initialRotation.x,
				y: initialRotation.y,
				z: initialRotation.z,
			},
			1200
		) // Move to (300, 200) in 1 second.
		.easing(TWEEN.Easing.Quadratic.In) // Use an easing function to make the animation smooth.
		.start(); // Start the tween immediately.
}

export {onMouseInAnimation, onMouseOutAnimation};
