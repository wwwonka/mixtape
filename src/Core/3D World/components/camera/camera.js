import {PerspectiveCamera} from "three/src/cameras/PerspectiveCamera";
import {onMouseInAnimation, onMouseOutAnimation} from "./setupAnimations.js";

function createCamera() {
	const camera = new PerspectiveCamera(
		65, // fov = Field Of View
		1, // aspect ratio (dummy value)
		0.1, // near clipping plane
		100 // far clipping plane
	);

	// move the camera back so we can view the scene
	// camera.position.set(-0.205, -0.246, 0.46);
	camera.position.set(0, 0, 0.46);
	camera.zoom = 2.63;

	camera.onMouseIn = () => {
		onMouseInAnimation(camera);
	};

	camera.onMouseOut = () => {
		onMouseOutAnimation(camera);
	};

	return camera;
}

export {createCamera};
