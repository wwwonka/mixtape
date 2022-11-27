import {WebGLRenderer} from "three";

function createRenderer() {
	const renderer = new WebGLRenderer({
		antialias: true,
		powerPreference: "high-performance", // "low-power",
		precision: "highp",
	});

	renderer.physicallyCorrectLights = true;

	return renderer;
}

export {createRenderer};
