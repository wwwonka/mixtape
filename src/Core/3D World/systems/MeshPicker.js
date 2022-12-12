import {Raycaster} from "three";

let pointerDown = false;

let supportsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

let intersectedObject = null;
let intersects = [];

class MeshPicker {
	constructor(camera, scene, renderer, container) {
		this.pickableObjects = [];
		this.intersectedObject = null;
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
		this.container = container;
	}

	async enable() {
		const raycaster = new Raycaster();

		let hasIntersected = false;
		let hasExit = false;

		// If touch is supported, enable orbit controls right away
		if (supportsTouch) {
			world.controls.enabled = true;
			this.container.addEventListener(
				"touchstart",
				(event) => {
					this.scene.getObjectByName("mixtape").onMouseIn();
				},
				false
			);
		} else {
			// ...And when user touches the scene container, play the animation

			///////////////////////

			// Otherwise, change behviour for mouse (desktop)
			this.container.addEventListener(
				"pointermove",
				(event) => {
					// Set the Raycaster
					raycaster.setFromCamera(
						{
							x:
								(event.clientX /
									this.renderer.domElement.clientWidth) *
									2 -
								1,
							y:
								-(
									event.clientY /
									this.renderer.domElement.clientHeight
								) *
									2 +
								1,
						},
						this.camera
					);

					intersects = raycaster.intersectObjects(
						this.pickableObjects,
						false
					);

					if (intersects.length > 0) {
						// Everything in this conditional block
						// will be called once only:
						if (!hasIntersected) {
							hasIntersected = true;
							hasExit = false;

							// Change cursor style to signify model can be rotated
							if (!pointerDown) {
								document.body.style.cursor = "grab";
							}

							this.intersectedObject = intersects[0].object;
							intersectedObject = this.intersectedObject;

							console.log("The mesh is under the cursor");

							world.controls.enabled = true;

							this.addPointerEventListeners();
						}
					} else {
						if (hasIntersected) {
							if (!hasExit) {
								console.log("The mesh is outside the cursor");

								// Except if user was already dragging the mesh put back the mouse cursor to default
								if (!pointerDown) {
									document.body.style.cursor = "default";
									world.controls.enabled = false;
								}
							}
							hasIntersected = false;

							this.intersectedObject = null;
						}

						if (this.intersectedObject === null) {
						}
					}
					// this.pickableObjects.forEach((object, intersected) => {
					// });
				},
				false
			);
		}
	}

	addPointerEventListeners() {
		document.addEventListener("pointerdown", pointerDownHandler);
		document.addEventListener("pointerup", pointerUpHandler);
	}

	removePointerEventListeners() {
		console.log("Removed pointer event listeners");
		document.removeEventListener("pointerdown", pointerDownHandler);
		document.removeEventListener("pointerup", pointerUpHandler);
	}
}

function pointerDownHandler() {
	console.log("Pointer down");
	pointerDown = true;

	// If mouse intersects the model
	if (intersects.length === 0) {
	} else {
		document.body.style.cursor = "grabbing";
		intersectedObject.parent.onMouseIn();
	}
}

function pointerUpHandler() {
	console.log("Pointer up");
	pointerDown = false;

	if (intersects.length === 0) {
		console.log("nothing under");
		document.body.style.cursor = "default";
		world.controls.enabled = false;
	} else {
		console.log("something under");
		document.body.style.cursor = "grab";
	}

	// setTimeout(() => {
	// 	intersectedObject.parent.onMouseOut();
	// }, 500);
}

function process_touchstart() {
	console.log("touched");
}

export {MeshPicker};
