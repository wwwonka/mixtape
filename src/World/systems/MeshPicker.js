import {Mesh, Object3D, Raycaster} from "three";

class MeshPicker {
	constructor(camera, scene, renderer) {
		this.pickableObjects = [];
		this.intersectedObject = null;
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
	}

	enable() {
		const raycaster = new Raycaster();
		let intersects = [];
		let hasIntersected = false;

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
						document.body.classList.add("pointer");
						this.intersectedObject = intersects[0].object;

						this.intersectedObject.parent.onMouseIn();
						this.camera.onMouseIn();
					}

					if (this.intersectedObject) {
						// console.log(this.on);
					}
				} else {
					if (hasIntersected) {
						// console.log("Out of pickable mesh");
						hasIntersected = false;
						document.body.classList.remove("pointer");

						// this.intersectedObject.parent.onMouseOut();
						this.camera.onMouseOut();

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
