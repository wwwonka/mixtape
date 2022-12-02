function disableRightClick() {
	document.addEventListener("contextmenu", (each) => {
		e.preventDefault();
	});
}

function ctrlShiftKey(e, keyCode) {
	return e.ctrlKey && e.shiftKey && e.keyCode.charCodeAt(0);
}

function disableDevTools() {
	document.onkeydown = (e) => {
		if (
			event.keyCode === 123 ||
			ctrlShiftKey(e, "I") ||
			ctrlShiftKey(e, "J") ||
			ctrlShiftKey(e, "C") ||
			(e.ctrlKey && e.keyCode === "U".charCodeAt(0))
		)
			return false;
	};
}

export {disableDevTools};
