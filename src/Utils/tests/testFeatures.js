import "feature.js";

export default function testBrowserFeatures() {
	const requisites = [
		"indexedDB",
		"persistentStorage",
		"backgroundFetch",
		"webShare",
		"webShareTarget",
		"contactPicker",
		"periodicBackgroundSync",
		"mediaSession",
		"fileSystemAccess",
		"contentIndex",
		"push",
		"badging",
		"screenWakeLock",
		"windowControlsOverlay",
	];

	for (const requisite of requisites) {
		feature.extend(requisite, function () {
			// console.log(requisite);
			if (requisite in window) {
				return true;
			}
		});
	}

	feature.extend("indexedDB", function () {
		if ("indexedDB" in window) {
			return true;
		}
	});

	// feature.testAll();

	console.table(feature);

	return feature;
}
