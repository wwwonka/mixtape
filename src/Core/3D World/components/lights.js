import {DirectionalLight, HemisphereLight, PointLight, SpotLight} from "three";

function createLights() {
	const ambientLight = new HemisphereLight("darkGray", "#fefbd8", 9.4);
	ambientLight.name = "ambientLight";

	const mainLight = new DirectionalLight("#F2F2F2", 1);
	mainLight.name = "mainLight";
	mainLight.position.set(-0.2, -0.15, 0.265);

	const pointLight = new PointLight(0xffffff, 0.33, 1);
	pointLight.name = "pointLight";
	pointLight.position.set(0.1, 0.3, 0.1);
	// pointLight.position.set(0.2, 0.25, 0.2);

	// const mainLight = new SpotLight("#F2F2F2", 0.68);
	// mainLight.name = "mainLight";
	// mainLight.position.set(-0.2, -0.15, -0.265);

	// const spotLight = new SpotLight(0xffffff, 1.3);
	// spotLight.name = "spotLight";
	// spotLight.power = 4;
	// spotLight.position.set(1, 1.45, 1.09);

	// mainLight.position.set(4.1, 5.33, 11.3);
	// mainLight.position.set(1.4, 5.33, 2.3);

	mainLight.onMouseIn = () => {
		// onMouseInAnimation(mainLight);
	};
	mainLight.onMouseOut = () => {
		// onMouseOutAnimation(mainLight);
	};

	return {ambientLight, mainLight, pointLight};
}

// function onMouseInAnimation(light) {
// 	const moveLight = new TWEEN.Tween(light.position)
// 		.to(
// 			{
// 				x: 4.1,
// 				y: 5.33,
// 				z: 17.2,
// 			},
// 			1000
// 		)
// 		.easing(TWEEN.Easing.Quadratic.Out)
// 		.start();

// 	const reduceIntensity = new TWEEN.Tween(light)
// 		.to(
// 			{
// 				intensity: 0.44,
// 			},
// 			1000
// 		)
// 		.easing(TWEEN.Easing.Quadratic.In)
// 		.start();
// }

// function onMouseOutAnimation(light) {
// 	const moveLightBack = new TWEEN.Tween(light.position)
// 		.to(
// 			{
// 				x: 4.4,
// 				y: 5.33,
// 				z: 11.3,
// 			},
// 			500
// 		)
// 		.easing(TWEEN.Easing.Quadratic.Out)
// 		.start();

// 	const reduceIntensity = new TWEEN.Tween(light)
// 		.to(
// 			{
// 				intensity: 0.68,
// 			},
// 			800
// 		)
// 		.easing(TWEEN.Easing.Quadratic.In)
// 		.start();
// }

export {createLights};
