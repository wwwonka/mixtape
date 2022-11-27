import {defineConfig} from "vite";

import mkcert from "vite-plugin-mkcert";
import {threeMinifier} from "@yushijinhun/three-minifier-rollup";
import {ViteMinifyPlugin} from "vite-plugin-minify";
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
	root: "src/", // index.html goes inside src/ folder
	publicDir: "../assets/", // Relative to the root
	server: {
		host: "0.0.0.0",
		port: "8080",
		https: true,
	},
	build: {
		outDir: "../build/",
		assetsDir: "scripts/",
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
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "inline",
			outDir: "../build/",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,mp3,glb}"],
				maximumFileSizeToCacheInBytes: 10485760,
				navigateFallbackAllowlist: [/^index.html$/],
			},
			devOptions: {
				enabled: true,
				// disableRuntimeConfig: true,

				navigateFallback: "index.html",
				workbox: {
					globPatterns: ["**/*.{js,css,html,ico,png,mp3,glb}"],
					maximumFileSizeToCacheInBytes: 10485760,

					navigateFallback: "index.html",
				},
			},
			manifest: {
				name: "#mixtape",
				short_name: "#mixtape",
				description:
					"A so-called social 'experiment' around analogical mixtapes.",
				display: "standalone",
				display_override: ["window-controls-overlay", "minimal-ui"],
				orientation: "any",

				theme_color: "#F2F2F2",
				background_color: "#F2F2F2", // Should be the same as the renderer background
				id: "/",
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
						src: "/icons/screenshot.jpg",
						sizes: "512x512",
						type: "image/jpg",
					},
				],
			},
		}),
		ViteMinifyPlugin({}),
		mkcert({
			hosts: ["localhost", "local ip addrs", "macbook.local"],
		}),
	],
});
