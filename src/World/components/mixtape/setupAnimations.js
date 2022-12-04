// import {TWEEN} from "@tweenjs/tween.js/dist/tween.umd";
import {MathUtils} from "three";

const initialScale = {x: 100, y: 100, z: 110};
let initialRotation = {x: 0, y: 0, z: 0};
let camera;

function onMouseInAnimation(model) {
	// console.log(model.parent);
	// console.log(model);
	// These values are the ones coming from the GLB file
	const currentScale = initialScale;
	// And this is how much bigger we want to make it
	const modelScaleFactor = 1.05;

	const scaleUp = new TWEEN.Tween(model.scale)
		.to(
			{
				x: initialScale.x * modelScaleFactor,
				y: initialScale.y * modelScaleFactor,
				z: initialScale.z * modelScaleFactor,
			},
			800
		)
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();

	// ROTATION
	// initialRotation.x = MathUtils.radToDeg(model.rotation.x);
	// initialRotation.y = MathUtils.radToDeg(model.rotation.y);
	// initialRotation.z = MathUtils.radToDeg(model.rotation.z);

	// initialRotation.x = model.rotation.x;
	// initialRotation.y = model.rotation.y;
	// initialRotation.z = model.rotation.z;

	// console.log(initialRotation);

	// const rotateTowardsCam = new TWEEN.Tween(camera.rotation)
	// 	.to(
	// 		{
	// 			x: MathUtils.degToRad(10),
	// 			y: MathUtils.degToRad(-18),
	// 			z: MathUtils.degToRad(4),
	// 		},
	// 		800
	// 	)
	// 	.easing(TWEEN.Easing.Quadratic.Out)
	// 	.start();

	// const rotate
}

function onMouseOutAnimation(model) {
	const scaleToInitialValue = new TWEEN.Tween(model.scale) // Create a new tween that modifies 'coords'.
		.to(
			{
				x: initialScale.x,
				y: initialScale.y,
				z: initialScale.z,
			},
			600
		) // Move to (300, 200) in 1 second.
		.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
		.start(); // Start the tween immediately.

	const rotateToInitialValue = new TWEEN.Tween(model.rotation) // Create a new tween that modifies 'coords'.
		.to(
			{
				x: 0,
				y: 0,
				z: 0,
			},
			6000
		) // Move to (300, 200) in 1 second.
		.easing(TWEEN.Easing.Quadratic.In) // Use an easing function to make the animation smooth.
		.start(); // Start the tween immediately.
}

export {onMouseInAnimation, onMouseOutAnimation};
