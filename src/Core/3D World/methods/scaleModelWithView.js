import {getVisibleHeightAtZDepth, getVisibleWidthAtZDepth} from "./getViewDimensions.js";

function scaleModelWithView(model, camera, factor = {x: 100, y: 100}) {
	model.scale.y = (factor.y * getVisibleHeightAtZDepth(model.position.z, camera)) / 100;
	model.scale.x = (factor.x * getVisibleWidthAtZDepth(model.position.z, camera)) / 100;
	console.log(getVisibleHeightAtZDepth(model.position.z, camera));
}

export {scaleModelWithView};
