import {EffectComposer} from "three/addons/postprocessing/EffectComposer.js";
import {RenderPass} from "three/addons/postprocessing/RenderPass.js";
// import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
// import {RenderPixelatedPass} from "three/examples/jsm/postprocessing/RenderPixelatedPass";
import {SMAAPass} from "three/examples/jsm/postprocessing/SMAAPass";

import {Vector2} from "three";
// import {Color} from "three";

function createEffectComposer(camera, renderer, scene, container) {
	// target.samples = 8;

	const composer = new EffectComposer(renderer);
	const resolution = new Vector2(container.innerWidth, container.innerHeight);

	// This is the base pass
	const renderPass = new RenderPass(scene, camera);
	composer.addPass(renderPass);

	// Outline pass
	composer.objectsToOutline = [];

	// const outlinePass = new OutlinePass(
	// 	new Vector2(container.innerWidth, container.innerHeight), // resolution of the Pass
	// 	scene,
	// 	camera,
	// 	composer.objectsToOutline
	// );

	// var params = {
	// 	edgeStrength: 4,
	// 	edgeGlow: 0,
	// 	edgeThickness: 4,
	// 	pulsePeriod: 0,
	// 	usePatternTexture: false,
	// };

	// outlinePass.edgeStrength = params.edgeStrength;
	// outlinePass.edgeGlow = params.edgeGlow;
	// outlinePass.edgeThickness = params.edgeThickness;
	// outlinePass.visibleEdgeColor.set(new Color("red"));
	// // outlinePass.hiddenEdgeColor.set(new Color("transparent"));
	// composer.addPass(outlinePass);

	// const params = {
	// 	pixelSize: 1,
	// 	normalEdgeStrength: 0.3,
	// 	depthEdgeStrength: 1,
	// };

	const pixelRatio = renderer.getPixelRatio();
	const antiaaliasPass = new SMAAPass(
		container.innerWidth * pixelRatio,
		container.innerHeight * pixelRatio
	);
	composer.addPass(antiaaliasPass);

	// Outline pass
	// composer.objectsToOutline = [];

	// const outlinePass = new OutlinePass(
	// 	new Vector2(container.innerWidth, container.innerHeight), // resolution of the Pass
	// 	scene,
	// 	camera,
	// 	composer.objectsToOutline
	// );

	// var params = {
	// 	edgeStrength: 2.4,
	// 	edgeGlow: 0,
	// 	edgeThickness: 1,
	// 	pulsePeriod: 0,
	// 	usePatternTexture: false,
	// };

	// outlinePass.edgeStrength = params.edgeStrength;
	// outlinePass.edgeGlow = params.edgeGlow;
	// outlinePass.edgeThickness = params.edgeThickness;
	// outlinePass.visibleEdgeColor.set(new Color("black"));
	// outlinePass.hiddenEdgeColor.set(new Color("transparent"));
	// composer.addPass(outlinePass);
	// const params = {
	// 	pixelSize: 1,
	// 	normalEdgeStrength: 0.3,
	// 	depthEdgeStrength: 1,
	// };

	// const renderPixelatedPass = new RenderPixelatedPass(
	// 	// new Vector2(container.innerWidth, container.innerHeight),
	// 	9,
	// 	scene,
	// 	camera,
	// 	params
	// 	// {pixelSize: 6} // resolution of the Pass
	// );
	// renderPixelatedPass.setSize(resolution.x, resolution.y);
	// // renderPixelatedPass.pixelSize = 1;

	// composer.addPass(renderPixelatedPass);

	// console.log(renderPixelatedPass);

	// composer.depixelisationTween = new TWEEN.Tween(renderPixelatedPass)
	// 	.to(
	// 		{
	// 			pixelSize: 0.1,
	// 		},
	// 		4200
	// 	)
	// 	.easing(TWEEN.Easing.Quadratic.Out)
	// 	.onUpdate(() => {
	// 		renderPixelatedPass.setPixelSize(renderPixelatedPass.pixelSize);
	// 	});
	// .start();

	return composer;
}

export {createEffectComposer};
