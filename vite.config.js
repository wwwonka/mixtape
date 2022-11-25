import {defineConfig} from "vite";
import mkcert from "vite-plugin-mkcert";
import {threeMinifier} from "@yushijinhun/three-minifier-rollup";
import {ViteMinifyPlugin} from "vite-plugin-minify";

export default defineConfig({
	root: ".",
	publicDir: "assets",
	server: {
		host: "0.0.0.0",
		port: "8080",
		https: true,
	},
	build: {
		outDir: "build",
		assetsDir: "scripts",
	},
	plugins: [
		mkcert(),
		{...threeMinifier(), enforce: "pre"},
		ViteMinifyPlugin({}),
	],
});
