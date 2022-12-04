function isBrowser() {
	document.addEventListener(
		"DOMContentLoaded",
		(event) => {
			// we can move only if we are not in a browser's tab
			let isBrowser = matchMedia("(display-mode: browser)").matches;
			if (!isBrowser) {
				window.moveTo(
					window.screen.availWidth / 2,
					window.screen.availHeight / 2
				);
				window.resizeTo(800, 600);
			}
			setTimeout(() => {
				window.resizeTo(
					window.screen.availWidth / 2,
					window.screen.availHeight / 2
				);
			});
		},
		500
	);
}

export {isBrowser};
