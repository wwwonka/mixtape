import {defineConfig} from "vite";
import {terser} from "rollup-plugin-terser"; // is part of vite

/* Vite plugins */
// Prune three.js
import {threeMinifier} from "@yushijinhun/three-minifier-rollup";
// Minify HTML in production
import {ViteMinifyPlugin} from "vite-plugin-minify";
// Auto-generate manifest and service worker
import {VitePWA} from "vite-plugin-pwa";
//Inline critical CSS
import PluginCritical from "rollup-plugin-critical";
// Compress all using gzip or brotli
import viteCompression from "vite-plugin-compression";

import mkcert from "vite-plugin-mkcert";

import {replaceCssFile} from "./dev/replaceCssFile";

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

// If BROTLI is passed in the command line as an env variable
let compression = false;

if (process.env.BROTLI && process.argv[2] === "build") {
	compression = true;
}

export default defineConfig({
	root: "src/", // index.html goes inside src/ folder
	publicDir: "../assets/", // Relative to the root
	build: {
		outDir: "../build/",
		assetsDir: "scripts/",
		emptyOutDir: true,
		reportCompressedSize: false,
		chunkSizeWarningLimit: 10485760,
		assetsInlineLimit: 4096, // 4kb
		// sourcemap: "hidden",
		rollupOptions: {
			output: {
				entryFileNames: `scripts/[name]-[hash].js`,
				chunkFileNames: `scripts/[name]-[hash].js`,
				assetFileNames: `scripts/[name]-[hash].[ext]`, // CSS
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
			manifestFilename: "app.webmanifest",
			includeAssets: ["/icons/screenshot.jpg"],
			workbox: {
				globPatterns: [
					"../build/**/*.{js,css,html,json,ico,jpg,png,svg,mp3,webmanifest}",
				],
				globIgnores: [
					"../build/scripts/index.css", // The CSS file generated by critical
					"../build/audio/_default.mp3",
				],
				maximumFileSizeToCacheInBytes: 10485760,
				navigateFallbackAllowlist: [/^index.html$/],
			},
			devOptions: {
				enabled: false,
				disableRuntimeConfig: true,
				registerType: "autoUpdate",
				injectRegister: "inline",
				outDir: "../build/",
				manifestFilename: "app.webmanifest",
				// includeAssets: ["/icons/screenshot.jpg"],
				workbox: {
					globDirectory: "../assets/",
					globPatterns: [
						"**/*.{js,css,html,json,ico,jpg,png,svg,mp3,webmanifest}",
					],
					// globIgnores: [
					// 	"../build/scripts/index.css", // The CSS file generated by critical
					// 	"../build/audio/_default.mp3",
					// ],
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
				// shortcuts: [
				// 	{
				// 		name: "Create new mixtape",
				// 		short_name: "Create new",
				// 		url: "/#create",
				// 		description: "Create a brand new mixtape from scratch",
				// 		icons: [
				// 			{
				// 				src: "/icons/pwa-shortcuts/shortcut-96x96.png",
				// 				sizes: "96x96",
				// 			},
				// 		],
				// 	},
				// 	{
				// 		name: "Mixtape Library",
				// 		short_name: "Library",
				// 		url: "/#collection",
				// 		description: "View your entire mixtape library",
				// 		icons: [
				// 			{
				// 				src: "/icons/pwa-shortcuts/shortcut-96x96.png",
				// 				sizes: "96x96",
				// 			},
				// 		],
				// 	},
				// 	{
				// 		name: "Downloaded files",
				// 		short_name: "Files",
				// 		url: "/#downloaded",
				// 		description:
				// 			"Reveal offline mixtapes in the File System",
				// 		icons: [
				// 			{
				// 				src: "/icons/pwa-shortcuts/shortcut-96x96.png",
				// 				sizes: "96x96",
				// 			},
				// 		],
				// 	},
				// ],
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
		{
			name: "postPluginCritical-command", // This will trigger after PluginCritical has finished doing its thing.
			closeBundle: () => {
				replaceCssFile();
			},
		},
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
				},
			},
		}),
		viteCompression({
			disable: !compression,
			filter: /\.(js|mjs|json|css|glb|svg|txt|webmanifest)$/i,
			threshold: 0,
			algorithm: "brotliCompress",
			compressionOptions: {
				level: 11,
			},
			ext: ".br",
			deleteOriginFile: false,
		}),
	],
});
