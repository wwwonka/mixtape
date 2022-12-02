function detectDisplayMode() {
	window.addEventListener("DOMContentLoaded", (event) => {
		// By default, we assume app is launched from browser tab
		let displayMode = "browser-tab";

		// If launched from Chromium PWA:
		if (window.matchMedia("(display-mode: standalone)").matches) {
			// displayMode should match 'display' attribute in app.webmanifest
			displayMode = "standalone";
		}

		// If launched from iOS home screen:
		/* 
        // We use here a non-standard  property only available in the WebKit engine ion iOS and iPadOS        
        if navigator.standalone is:
            undefined: not on iOS
            false: launched as browser tab
            true: launched from iOS home screen
        */

		if (navigator.standalone) {
			displayMode = "standalone-ios";
		}

		console.log("DISPLAY_MODE_LAUNCH:", displayMode);
	});
}

export {detectDisplayMode};
