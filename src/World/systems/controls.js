import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

function createControls(camera, canvas) {
	const controls = new OrbitControls(camera, canvas);

	controls.enableDamping = true;
	//controls.dampingFactor = 1;
	controls.maxZoom = 0.2;
	controls.enablePan = false;
	controls.zoomSpeed = 0.4;

	// Forward controls.update to our custom .tick method
	controls.tick = () => controls.update();

	return controls;
}

export {createControls};
