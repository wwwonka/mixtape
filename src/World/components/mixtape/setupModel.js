import {AnimationMixer} from "three";

function setupModel(data) {
	const model = data.scene.children[0];
	const clip = data.animations[0];

	const mixer = new AnimationMixer(model);
	const action = mixer.clipAction(clip);
	// action.reset();
	// action.clampWhenFinished = true;
	// ac;
	action.play();
	action.paused = true;
	// window.action = action;
	// action.fadeOut(3);

	const btns = document.querySelectorAll(".btn");

	for (let btn of btns) {
		btn.onclick = () => {
			btn.classList.toggle("active");

			if (btn.classList.contains("active")) {
				action.paused = false;
				// action.fadeIn(3);
			} else {
				action.halt(0.75);
			}
		};
		// action.play();

		// remainingBtn.classList.toggle("active");
	}

	model.tick = (delta) => {
		// if (active) {
		mixer.update(delta);
		// }
	};

	return model;
}

export {setupModel};
