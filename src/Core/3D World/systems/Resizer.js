const setSize = (container, camera, renderer, composer) => {
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	composer.setSize(container.clientWidth, container.clientHeight);
	composer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
	constructor(container, camera, renderer, composer) {
		// Set initial size
		setSize(container, camera, renderer, composer);

		window.addEventListener("resize", () => {
			// Set the size again if a resize occurs
			setSize(container, camera, renderer, composer);

			// Perform any custom actions
			this.onResize();
		});
	}

	onResize() {}
}

export {Resizer};
