import fs from "fs";
import glob from "glob";

import {defineConfig} from "vite";

// Vite plugins
import {threeMinifier} from "@yushijinhun/three-minifier-rollup";
import {ViteMinifyPlugin} from "vite-plugin-minify";
import {VitePWA} from "vite-plugin-pwa";
import PluginCritical from "rollup-plugin-critical";
import mkcert from "vite-plugin-mkcert";
import {terser} from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

import findRemoveSync from "find-remove";

// Since we are hosted on CloudFlare Pages and it doesn't allow assets larger than 25 mb,
// We will remove it from our build and stream the audio from GitHub directly in the code. (See main.js)
if (process.env.CF_PAGES) {
	console.log(
		"Building for Cloudflare Pages build, removing files of over 25MB in size..."
	);
	// remove all large playlists
	const deletedFiles = findRemoveSync("./assets/audio", {prefix: "playlist"});
	console.log(deletedFiles);
}

export default defineConfig({
	root: "src/", // index.html goes inside src/ folder
	publicDir: "../assets/", // Relative to the root
	build: {
		outDir: "../build/",
		assetsDir: "scripts/",
		emptyOutDir: true,
		chunkSizeWarningLimit: 10485760,
		assetsInlineLimit: 4096, // 4kb
		rollupOptions: {
			output: {
				entryFileNames: `scripts/[name].js`,
				chunkFileNames: `scripts/[name].js`,
				assetFileNames: `scripts/[name].[ext]`,
			},
			plugins: [
				terser({
					compress: {
						defaults: false,
						drop_console: true,
					},
					mangle: {
						eval: true,
						module: true,
						toplevel: true,
						safari10: true,
						properties: false,
					},
					output: {
						comments: false,
						ecma: "2020",
					},
				}),
			],
		},
	},
	server: {
		host: "0.0.0.0",
		port: "8080",
		https: true,
	},

	plugins: [
		{...threeMinifier(), enforce: "pre"},
		ViteMinifyPlugin({
			comments: false,
		}),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "inline",
			outDir: "../build/",
			manifestFilename: "manifest.json",
			includeAssets: ["/icons/screenshot.jpg"],
			workbox: {
				// globPatterns: ["../build/**/*.{js,css,html,ico,png,mp3,glb}"],
				globPatterns: ["../build/**/*.{js,css,html,ico,png,mp3}"],
				maximumFileSizeToCacheInBytes: 10485760,
				navigateFallbackAllowlist: [/^index.html$/],
			},
			devOptions: {
				enabled: true,
				disableRuntimeConfig: true,
				registerType: "autoUpdate",
				injectRegister: "inline",
				outDir: "../build/",
				manifestFilename: "manifest.json",
				includeAssets: ["/icons/screenshot.jpg"],
				workbox: {
					globDirectory: "../assets/",
					globPatterns: ["/**/*.{js,css,html,ico,png,mp3,glb}"],
					maximumFileSizeToCacheInBytes: 10485760,
					navigateFallbackAllowlist: [/^index.html$/],
				},
			},
			manifest: {
				id: "#mixtape",
				name: "#mixtape",
				short_name: "#mixtape",
				description:
					'A so-called "social experiment" around analogical mixtapes.',
				dir: "auto",
				display: "standalone",
				display_override: ["window-controls-overlay", "standalone"],
				orientation: "portrait-primary",

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
						src: "/icons/pwa-icon/maskable_icon_x48.png",
						sizes: "48x48",
						type: "image/png",
						purpose: "maskable any",
					},
					{
						src: "/icons/pwa-icon/maskable_icon_x72.png",
						sizes: "72x72",
						type: "image/png",
						purpose: "maskable any",
					},
					{
						src: "/icons/pwa-icon/maskable_icon_x96.png",
						sizes: "96x96",
						type: "image/png",
						purpose: "maskable any",
					},
					{
						src: "/icons/pwa-icon/maskable_icon_x128.png",
						sizes: "128x128",
						type: "image/png",
						purpose: "maskable any",
					},
					{
						src: "/icons/pwa-icon/maskable_icon_x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable any",
					},
					{
						src: "/icons/pwa-icon/maskable_icon_x384.png",
						sizes: "384x384",
						type: "image/png",
						purpose: "maskable any",
					},
					{
						src: "/icons/pwa-icon/maskable_icon_x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable any",
					},
					{
						src: "/icons/pwa-icon/monochrome_icon.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "monochrome",
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
						short_name: "Create new",
						url: "/#create",
						description: "Create a brand new mixtape from scratch",
						icons: [
							{
								src: "/icons/pwa-shortcuts/shortcut-96x96.png",
								sizes: "96x96",
							},
						],
					},
					{
						name: "Mixtape Library",
						short_name: "Library",
						url: "/#collection",
						description: "View your entire mixtape library",
						icons: [
							{
								src: "/icons/pwa-shortcuts/shortcut-96x96.png",
								sizes: "96x96",
							},
						],
					},
					{
						name: "Downloaded files",
						short_name: "Files",
						url: "/#downloaded",
						description:
							"Reveal offline mixtapes in the File System",
						icons: [
							{
								src: "/icons/pwa-shortcuts/shortcut-96x96.png",
								sizes: "96x96",
							},
						],
					},
				],
			},
			// https://developer.chrome.com/articles/url-protocol-handler/?utm_source=devtools#protocol-handler-debugging-in-devtools
			protocol_handlers: [
				{
					protocol: "web+mixtape",
					url: "/",
				},
			],
			prefer_related_applications: false,
		}),
		mkcert({
			hosts: ["localhost", "local ip addrs", "macbook.local"],
		}),
		// cleanup(),
		PluginCritical({
			criticalUrl: "./build/index.html",
			criticalBase: "./build/",
			criticalPages: [{uri: "", template: "index"}],
			criticalConfig: {
				inline: true,
				extract: true,
				target: {
					html: "./index.html",
					uncritical: "./scripts/index.css",
					// uncritical: glob("./build/scripts/*.css", (files) => {
					// 	files[0];
					// }),
					// uncritical:
				},
			},
		}),
	],
});

// glob("./build/scripts/*.css", function (files) {
// 	console.log(files);
// });

// glob("*.css", {cwd: "./build/scripts/"}, function (er, files) {
// 	return files[0];
// });

glob("*.css", {cwd: "./build/scripts/"}, function (er, files) {
	console.log(typeof files[0]);
	console.log(files[0]);
});
// fs.access("./build/*.css", fs.F_OK, (err) => {
// 	if (err) {
// 		console.error(err);
// 		return;
// 	}

// 	console.log()
// });

// fs.readdirSync("./build/scripts").filter((allFilesPaths) => {
// 	if (allFilesPaths.match(/\.css$/) !== null) {
// 		console.log(typeof allFilesPaths);
// 		console.log(allFilesPaths);
// 	}
// });
// fs.readdirSync("./build/scripts").filter((allFilesPaths) => {
// 	console.log(allFilesPaths.match(/\.css$/));
// 	// var files = fs.readdirSync("C:/tmp").filter((fn) => fn.endsWith(".csv"));
// });
