import {DirectionalLight, HemisphereLight, PointLight, SpotLight} from "three";

function createLights() {
	const ambientLight = new HemisphereLight("darkGray", "#fefbd8", 9.4);
	ambientLight.name = "ambientLight";

	const mainLight = new DirectionalLight("#F2F2F2", 1);
	mainLight.name = "mainLight";
	mainLight.position.set(-0.2, -0.15, 0.265);

	const pointLight = new PointLight(0xffffff, 0.33, 5);
	pointLight.name = "pointLight";
	pointLight.position.set(0.1, 0.265, 0.1);

	// const highlightsLight = new PointLight(0xffffff, 0.4);
	// highlightsLight.name = "highlightsLight";
	// highlightsLight.position.set(0.05, -0.16, -0.5);

	return {
		ambientLight,
		mainLight,
		pointLight,
		//   highlightsLight
	};
}

export {createLights};
