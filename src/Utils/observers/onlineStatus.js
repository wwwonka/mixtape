function observeOnlineStatus() {
	window.addEventListener("offline", (event) => {
		console.log("offline");
	});

	window.addEventListener("online", (event) => {
		console.log("online");
	});
}

export {observeOnlineStatus};
