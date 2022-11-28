function listenKeyboardShorcuts() {
	// Disable Dev Tools Shortcut
	document.addEventListener(
		"keydown",
		(event) => {
			const keyName = event.key;

			console.log(event);

			if (keyName === "Control") {
				// do not alert when only Control key is pressed.
				// console.log(event);
				return;
			}

			if (event.metaKey) {
				// Even though event.key is not 'Control' (e.g., 'a' is pressed),
				// event.ctrlKey may be true if Ctrl key is pressed at the same time.
				if (event.altKey) {
					// if (event.key === "i") {
					if (event.key === "i") {
					}

					// }
				}
			} else {
				// alert(`Key pressed ${keyName}`);
			}
		},
		false
	);
}

export {listenKeyboardShorcuts};
