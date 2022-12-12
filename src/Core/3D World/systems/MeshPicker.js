import {Raycaster} from "three";

let pointerDown = false;
let pointerUp = false;
let supportsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

let intersectedObject = null;

class MeshPicker {
	constructor(camera, scene, renderer) {
		this.pickableObjects = [];
		this.intersectedObject = null;
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;

		this.light;
	}

	async enable() {
		const raycaster = new Raycaster();

		let intersects = [];

		let hasIntersected = false;
		let hasExit = false;

		// If touch is supported, enable orbit controls right away
		if (supportsTouch) {
			world.controls.enabled = true;
		}
		// ...And when user touches the scene container, play the animation
		document.getElementById("scene-container").addEventListener(
			"touchstart",
			(event) => {
				this.scene.getObjectByName("mixtape").onMouseIn();
			},
			false
		);

		// Otherwise, change behviour for mouse
		document.addEventListener(
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
						document.body.style.cursor = "grab";
						this.intersectedObject = intersects[0].object;
						intersectedObject = this.intersectedObject;

						console.log("The mesh is under the cursor");

						world.controls.enabled = true;

						this.addPointerEventListeners();

						// this.intersectedObject.parent.onMouseIn();
						// this.scene.getObjectByName("mainLight").onMouseIn();
						// this.scene
						// 	.getObjectByName("mainLight")
						// 	.lookAt(this.intersectedObject.parent);
					}
				} else {
					if (hasIntersected) {
						if (!hasExit) {
							console.log("The mesh is outside the cursor");
							this.removePointerEventListeners(
								this.intersectedObject
							);
							document.body.style.cursor = "default";
							// this.camera.onMouseOut();
							// this.scene
							// 	.getObjectByName("mainLight")
							// 	.onMouseOut();
							// console.log("!!");
							// this.intersectedObject.parent.onMouseOut();
						}
						hasIntersected = false;

						this.intersectedObject = null;
					}

					if (this.intersectedObject === null) {
					}
				}
				this.pickableObjects.forEach((object, intersected) => {
					// if (
					// 	intersectedObject &&
					// 	intersectedObject.name === o.name
					// ) {
					// 	console.log("hey hey");
					// 	// pickableObjects[i].material = highlightedMaterial;
					// } else {
					// 	console.log("ho ho");
					// 	// pickableObjects[i].material = originalMaterials[o.name];
					// }
				});
			},
			false
		);
	}

	test() {
		console.log("TEST");
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
	document.body.style.cursor = "grabbing";

	pointerDown = true;
	intersectedObject.parent.onMouseIn();
}

function pointerUpHandler() {
	console.log("Pointer up");
	document.body.style.cursor = "grab";

	// setTimeout(() => {
	// 	intersectedObject.parent.onMouseOut();
	// }, 500);
}

function process_touchstart() {
	console.log("touched");
}

export {MeshPicker};
