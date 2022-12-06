import {Raycaster} from "three";

class MeshPicker {
	constructor(camera, scene, renderer) {
		this.pickableObjects = [];
		this.intersectedObject = null;
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;

		this.light;
	}

	enable() {
		const raycaster = new Raycaster();
		let intersects = [];
		let hasIntersected = false;
		let hasExit = false;

		document.addEventListener(
			"mousemove",
			(event) => {
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
					// This is called once
					if (!hasIntersected) {
						hasIntersected = true;
						hasExit = false;

						document.body.classList.add("pointer");
						this.intersectedObject = intersects[0].object;

						this.intersectedObject.parent.onMouseIn();
						this.camera.onMouseIn();
						// this.scene.getObjectByName("mainLight").onMouseIn();
						console.log("!");
						// this.scene
						// 	.getObjectByName("mainLight")
						// 	.lookAt(this.intersectedObject.parent);
					}
				} else {
					if (hasIntersected) {
						if (!hasExit) {
							hasExit = true;
							document.body.classList.remove("pointer");
							this.camera.onMouseOut();
							this.scene
								.getObjectByName("mainLight")
								.onMouseOut();
							console.log("!!");
							this.intersectedObject.parent.onMouseOut();
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
}

export {MeshPicker};
