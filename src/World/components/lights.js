import {Camera, DirectionalLight, HemisphereLight} from "three";

function createLights() {
	const ambientLight = new HemisphereLight("darkGray", "#fefbd8", 7.4);

	const mainLight = new DirectionalLight("white", 0.88);
	mainLight.position.set(4.4, 5.33, 11.3);

	return {ambientLight, mainLight};
}

export {createLights};
