addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event.request));
});

/**
 * @param {Request} request
 */
async function handleRequest(request) {
	const response = await fetch(request);
	const content_type = response.headers.get("Content-Type");
	if (!content_type) {
		var headers = new Headers();
		for (var kv of response.headers.entries()) {
			headers.append(kv[0], kv[1]);
		}

		const url = request.url;
		console.log("Missing content type for url ", url);
		headers.set("Content-Type", get_content_type(url));
		headers.set("x-julia-test", "edited headers!");
		response.headers = headers;
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: headers,
		});
	}
	return response;
}

function get_content_type(url) {
	if (url.endsWith(".glb")) {
		return "application/json";
	} else if (url.endsWith(".png")) {
		return "image/png";
	} else if (url.endsWith(".jpg")) {
		return "image/jpg";
	} else if (url.endsWith(".css")) {
		return "text/css";
	} else if (url.endsWith(".pdf")) {
		return "application/pdf";
	} else {
		return "text/html; charset=UTF-8";
	}
}
