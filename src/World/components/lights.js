import {DirectionalLight, HemisphereLight} from "three";

function createLights() {
	const ambientLight = new HemisphereLight("darkGray", "#fefbd8", 7.4);
	ambientLight.name = "ambientLight";

	const mainLight = new DirectionalLight("white", 0.68);
	mainLight.name = "mainLight";
	mainLight.position.set(4.1, 5.33, 11.3);
	// mainLight.position.set(1.4, 5.33, 2.3);

	mainLight.onMouseIn = () => {
		onMouseInAnimation(mainLight);
	};
	mainLight.onMouseOut = () => {
		onMouseOutAnimation(mainLight);
	};

	return {ambientLight, mainLight};
}

function onMouseInAnimation(light) {
	const moveLight = new TWEEN.Tween(light.position)
		.to(
			{
				x: 4.1,
				y: 5.33,
				z: 17.2,
			},
			1000
		)
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();

	const reduceIntensity = new TWEEN.Tween(light)
		.to(
			{
				intensity: 0.44,
			},
			1000
		)
		.easing(TWEEN.Easing.Quadratic.In)
		.start();
}

function onMouseOutAnimation(light) {
	const moveLightBack = new TWEEN.Tween(light.position)
		.to(
			{
				x: 4.4,
				y: 5.33,
				z: 11.3,
			},
			500
		)
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();

	const reduceIntensity = new TWEEN.Tween(light)
		.to(
			{
				intensity: 0.68,
			},
			800
		)
		.easing(TWEEN.Easing.Quadratic.In)
		.start();
}

export {createLights};
