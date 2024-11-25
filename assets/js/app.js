import Router from "./router.js";
import { marked } from "marked";
import "../css/styles.css";
import "../css/theme.css";

// Authentication simulation
const isAuthenticated = () => {
	// Replace this with real authentication logic
	return true;
};

// Initialize the router
const router = new Router(isAuthenticated, "/");

// Define routes
router.route("/", "home", (routerInstance, params) => {
	loadPageContent("home.md");
});

router.route("/about", "about", (routerInstance, params) => {
	loadPageContent("about.md");
});

router.route(
	"/confidentiality",
	"confidentiality",
	(routerInstance, params) => {
		loadPageContent("confidentiality.md");
	},
);

router.route("/demo", "demo", (routerInstance, params) => {
	loadPageContent("demo.md");
});

router.route("/download", "download", (routerInstance, params) => {
	loadPageContent("download.md");
});

// Start the router
router.start();

// Activate navigation links
router.activateLinks();

// Utility function to load and display markdown content
async function loadPageContent(file) {
	try {
		const response = await fetch(`/markdown/${file}`);
		if (!response.ok) throw new Error("Failed to load content");
		const text = await response.text();
		const markedContent = marked.parse(text); // Assuming Marked.js is included in the project
		document.getElementById("content").innerHTML = markedContent;
	} catch (error) {
		console.error("Error loading content:", error);
		document.getElementById("content").innerHTML = `
            <h1>Error</h1>
            <p>Unable to load the content. Please try again later.</p>`;
	}
}

// Optional: Handle errors globally (e.g., 404 page)
router.route("/404", "notFound", (routerInstance, params) => {
	document.getElementById("content").innerHTML = `
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>`;
});
