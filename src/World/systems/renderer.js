import {WebGLRenderer} from "three";

function createRenderer() {
	const renderer = new WebGLRenderer({
		antialias: true,
		powerPreference: "low-power",
	});

	renderer.physicallyCorrectLights = true;

	return renderer;
}

export {createRenderer};
