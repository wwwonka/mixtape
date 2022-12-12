import {AnimationMixer} from "three/src/animation/AnimationMixer";
import {MathUtils} from "three";

function setupModel(data) {
	const model = data.scene.children[0];
	const clip = data.animations[0];

	// Model Transforms
	model.rotation.x = MathUtils.degToRad(-18.4);
	model.rotation.y = MathUtils.degToRad(23.4);
	model.rotation.z = MathUtils.degToRad(-1);
	model.position.y = 0.05;

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

	// let btn = document.querySelector('[title="play-pause"]');

	// btn.onclick = () => {
	// 	// if (btn.classList.contains("active")) {
	// 	// 	console.log("!");
	// 	// }

	// 	if (btn.classList.contains("active")) {
	// 		// model.playAnim();
	// 	} else {
	// 		action.halt(0.75);
	// 	}
	// };

	const radiansPerSecond = MathUtils.degToRad(2);

	model.tick = (delta) => {
		mixer.update(delta);

		// Little statup Animation
		// if (model.rotation.x <= MathUtils.degToRad(4.1)) {
		// 	// model.rotation.z += radiansPerSecond * delta;
		// 	// model.rotation.x += radiansPerSecond * delta;
		// 	// model.rotation.y += radiansPerSecond * delta;
		// 	// console.log(model.helper);
		// 	// model.helper.update();
		// }
	};

	return model;
}

export {setupModel};
