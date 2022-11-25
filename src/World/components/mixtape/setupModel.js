import {AnimationMixer} from "three";

function setupModel(data) {
	const model = data.scene.children[0];
	const clip = data.animations[0];

	const song = new Audio("/audio/raingod.mp3");
	const hissing = new Audio("/audio/hissing.mp3");

	const mixer = new AnimationMixer(model);
	const action = mixer.clipAction(clip);

	action.play();
	action.paused = true;

	const btns = document.querySelectorAll(".btn");

	for (let btn of btns) {
		btn.onclick = () => {
			btn.classList.toggle("active");

			if (btn.classList.contains("active")) {
				action.paused = false;
				hissing.play();
				setTimeout(() => {
					song.play();
				}, 1800);

				// action.fadeIn(3);
			} else {
				action.halt(0.75);

				song.pause();
				hissing.pause();
			}
		};
	}

	model.tick = (delta) => {
		mixer.update(delta);
	};

	return model;
}

export {setupModel};
