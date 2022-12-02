import {defineConfig} from "vite";

import {threeMinifier} from "@yushijinhun/three-minifier-rollup";
import {ViteMinifyPlugin} from "vite-plugin-minify";
import {VitePWA} from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
	root: "src/", // index.html goes inside src/ folder
	publicDir: "../assets/", // Relative to the root
	build: {
		outDir: "../build/",
		assetsDir: "scripts/",
		emptyOutDir: true,
		chunkSizeWarningLimit: 10485760,
	},
	server: {
		host: "0.0.0.0",
		port: "8080",
		https: true,
	},
	/* ---- Netlify Proxy ------------------------------------------------
		This proxy rule will ensure that every fetch made to "/api/..."
		is automatically redirected to the Netlify functions server.
		* Had to comment out ::1 localhost in /etc/hosts to get it working
		Solution found here: https://github.com/vitejs/vite/issues/2571 
	*/
	proxy: {
		"/api": {
			target: "http://localhost:8888/.netlify/functions",
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/api/, ""),
		},
	},
	// //------------------------------------------------------------------------

	plugins: [
		{...threeMinifier(), enforce: "pre"},
		ViteMinifyPlugin({}),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "inline",
			outDir: "../build/",
			manifestFilename: "manifest.json",
			includeAssets: ["/icons/screenshot.jpg"],
			workbox: {
				globPatterns: ["../build/**/*.{js,css,html,ico,png,mp3,glb}"],
				maximumFileSizeToCacheInBytes: 10485760,
				navigateFallbackAllowlist: [/^index.html$/],
			},
			devOptions: {
				enabled: true,
				disableRuntimeConfig: true,
				registerType: "autoUpdate",
				injectRegister: "inline",
				outDir: "../build/",
				// manifestFilename: "manifest.webmanifest",
				includeAssets: ["/icons/screenshot.jpg"],
				workbox: {
					globDirectory: "../build/",
					globPatterns: ["/**/*.{js,css,html,ico,png,mp3,glb}"],
					maximumFileSizeToCacheInBytes: 10485760,
					navigateFallbackAllowlist: [/^index.html$/],
				},
			},
			manifest: {
				id: "#mixtape",
				name: "mixtape",
				short_name: "#mixtape",
				description:
					"A so-called social 'experiment' around analogical mixtapes.",
				dir: "auto",
				display: "standalone",
				display_override: [
					"window-controls-overlay",
					"standalone",
					"browser",
				],
				orientation: "any",

				theme_color: "#F2F2F2",
				background_color: "#F2F2F2", // Should be the same as the 3d renderer background
				scope: "/",
				start_url: "/",
				categories: [
					"entertainment",
					"multimedia",
					"music",
					"social",
					"social networking",
				],
				icons: [
					{
						src: "/icons/pwa-icon/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icons/pwa-icon/icon-256x256.png",
						sizes: "256x256",
						type: "image/png",
					},
					{
						src: "/icons/pwa-icon/icon-384x384.png",
						sizes: "384x384",
						type: "image/png",
					},
					{
						src: "/icons/pwa-icon/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
				screenshots: [
					{
						src: "/icons/pwa-misc/screenshot.jpg",
						sizes: "512x512",
						type: "image/jpg",
					},
					{
						src: "/icons/pwa-misc/screenshot.jpg",
						sizes: "512x512",
						type: "image/jpg",
					},
					{
						src: "/icons/pwa-misc/screenshot.jpg",
						sizes: "512x512",
						type: "image/jpg",
					},
				],
				shortcuts: [
					{
						name: "Create new mixtape",
						// short_name: "New mixtape",
						url: "/#create",
					},
					{
						name: "Mixtape Collection",
						url: "/#collection",
						// icons: {
						// 	src: "/icons/pwa-shortcuts/shortcut-96x96.jpg",
						// 	sizes: "512x512",
						// 	type: "image/jpg",
						// },
					},
					{
						name: "Reveal offline mixtapes in the Finder",
						// short_name: "Offline mixtapes",
						url: "/#downloaded",
					},
				],
			},
			// https://developer.chrome.com/articles/url-protocol-handler/?utm_source=devtools#protocol-handler-debugging-in-devtools
			protocol_handlers: [
				{
					protocol: "web+mixtape",
					url: "/",
				},
				// {
				// 	protocol: "web+coffee",
				// 	url: "/coffee?type=%s",
				// },
			],
			prefer_related_applications: false,
		}),
		mkcert({
			hosts: ["localhost", "local ip addrs", "macbook.local"],
		}),
	],
});
