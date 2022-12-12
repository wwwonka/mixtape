import {hasIndexedDB} from "./hasIndexedDB.js";

class FeatureDetector {
	constructor() {
		this.indexedDB = hasIndexedDB();
	}
	runTests() {
		console.log("tests should be runnned");
	}
}

export {FeatureDetector};
