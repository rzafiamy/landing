import { defineConfig } from "vite";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
	root: ".",
	build: {
		outDir: "dist",
		minify: true,
		emptyOutDir: true,
	},
	server: {
		host: "0.0.0.0",
		watch: {
			usePolling: true,
		},
	},
	css: {
		postcss: {
			plugins: [tailwind, autoprefixer],
		},
	},
});
