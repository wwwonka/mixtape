export default {
	async fetch(request) {
		console.log("Hello World!");
		return new Response("Hello World!");
	},
};
