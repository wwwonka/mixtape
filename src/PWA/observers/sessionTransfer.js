function observeSessionTranser() {
	window.addEventListener("DOMContentLoaded", () => {
		// replace standalone with your display used in manifest
		window.matchMedia("(display-mode: standalone)").addListener((event) => {
			if (event.matches) {
				// From browser to standalone PWA
				console.log("SESSION_TRANSFER: from browser to pwa");
			} else {
				// From standalone to browser
				console.log("SESSION_TRANSFER: from stand-alone to browser");
			}
		});
	});
}

export {observeSessionTranser};
