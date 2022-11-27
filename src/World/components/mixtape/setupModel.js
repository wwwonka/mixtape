import {AnimationMixer, MathUtils} from "three";

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

	model.position.y = 0.05;

	const radiansPerSecond = MathUtils.degToRad(2);

	model.tick = (delta) => {
		mixer.update(delta);

		// Little statup Animation
		if (model.rotation.x <= MathUtils.degToRad(4.1)) {
			model.rotation.z += radiansPerSecond * delta;
			model.rotation.x += radiansPerSecond * delta;
			model.rotation.y += radiansPerSecond * delta;
		}
	};

	return model;
}

export {setupModel};
