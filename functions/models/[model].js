async function handleRequest(request) {
	let resp = await fetch(request.url, request);

	let newResp = new Response(resp.body, {
		headers: resp.headers,
		status: resp.status,
	});

	if (request.url.endsWith(".glb")) {
		newResp.headers.set("Content-Type", "application/json");
	}

	return newResp;
}

addEventListener("fetch", (event) =>
	event.respondWith(handleRequest(event.request))
);
