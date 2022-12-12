import {WebGLRenderer} from "three/src/renderers/WebGLRenderer";
// import {Color} from "three";

function createRenderer() {
	const renderer = new WebGLRenderer({
		antialias: false,
		powerPreference: "high-performance", // "low-power",
		precision: "highp",
		// clearColor,
		// alpha: true,
	});

	// renderer.setClearColor(new Color("#f2f2f2"), 0); // Background color
	// renderer.setClearColor(new Color("red"), 0); // Background color

	renderer.physicallyCorrectLights = true;

	return renderer;
}

export {createRenderer};
