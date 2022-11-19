import {DirectionalLight, HemisphereLight} from "three";

function createLights() {
	const ambientLight = new HemisphereLight("white", "darkslategrey", 5);

	const mainLight = new DirectionalLight("white", 11);
	mainLight.position.set(10, 10, 10);

	// const rimLight = new DirectionalLight("white", 11);
	// rimLight.position.set(-10, -10, -10);
	// rimLight.lookAt(0, 0, 0);

	return {ambientLight, mainLight};
}

export {createLights};
