import {AnimationMixer} from "three/src/animation/AnimationMixer";
import {MathUtils} from "three";

function setupModel(data) {
	const model = data.scene.children[0];
	const clip = data.animations[0];

	// Model Transforms
	model.rotation.x = MathUtils.degToRad(-18.4);
	model.rotation.y = MathUtils.degToRad(23.4);
	model.rotation.z = MathUtils.degToRad(-1);

	// model.position.y = 0.01;

	// Model Animations
	const mixer = new AnimationMixer(model);
	const action = mixer.clipAction(clip);

	model.playAnim = () => {
		action.paused = false;
		action.stopWarping();
	};

	model.pauseAnim = () => {
		action.halt(0.75);
	};

	action.play();
	action.paused = true;

	model.tick = (delta) => {
		mixer.update(delta);
	};

	return model;
}

export {setupModel};
