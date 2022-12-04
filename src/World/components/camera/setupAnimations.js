let initialPosition = {x: null, y: null, z: null};

function onMouseInAnimation(camera) {
	initialPosition.x = camera.position.x;
	initialPosition.y = camera.position.y;
	initialPosition.z = camera.position.z;

	const lookAtModel = new TWEEN.Tween(camera.position)
		.to(
			{
				x: 0.0,
				y: 0.0,
				z: 0.5,
			},
			800
		)
		.easing(TWEEN.Easing.Quadratic.InOut)
		// .delay(200)
		.start();
}

function onMouseOutAnimation(camera) {
	const lookAtModel = new TWEEN.Tween(camera.position)
		.to(
			{
				x: initialPosition.x,
				y: initialPosition.y,
				z: initialPosition.z,
			},
			1500
		)
		.easing(TWEEN.Easing.Cubic.Out)
		.start();
}

export {onMouseInAnimation, onMouseOutAnimation};
