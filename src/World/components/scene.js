import {Color, Scene} from "three";

function createScene() {
	const scene = new Scene();

	scene.background = new Color("#f2f2f2");

	return scene;
}

export {createScene};
