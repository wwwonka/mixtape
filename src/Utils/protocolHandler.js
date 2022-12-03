function registerProtocolHandler() {
	if (navigator.registerProtocolHandler) {
		navigator.registerProtocolHandler(
			"web+mixtape",
			`${window.location.origin}/?mixtape=%s`,
			"#mixtape"
		); // last title arg included for compatibility
	}
}

export {registerProtocolHandler};
