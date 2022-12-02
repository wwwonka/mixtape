function observeAppInstalled() {
	// This event fires only ONCE in Chromium-based browsers when user JUST INSTALLED THE APP
	window.addEventListener("appinstalled", () => {
		console.log("INSTALL: Success");
	});
}
export {observeAppInstalled};
