import Router from "./router.js";
import { marked } from "marked";
import i18n from "./i18n.js";
import "../css/main.css";

// Authentication simulation
const isAuthenticated = () => {
	// Replace this with real authentication logic
	return true;
};

// Initialize the router
const router = new Router(isAuthenticated, "/");

// Define routes
router.route("/", "home", (routerInstance, params) => {
	loadPageContent("landing");
});

router.route("/about", "about", (routerInstance, params) => {
	loadPageContent("about");
});

router.route("/cgu", "cgu", (routerInstance, params) => {
	loadPageContent("cgu");
});

router.route("/demo", "demo", (routerInstance, params) => {
	loadPageContent("demo");
});

router.route("/download", "download", (routerInstance, params) => {
	loadPageContent("download");
});

// Start the router
router.start();

// Activate navigation links
router.activateLinks();

// Utility function to load and display markdown content
async function loadPageContent(page) {
	const response = await fetch(
		`/pages/${page === "landing" ? "landing" : "template"}.html`,
	);
	const content = await response.text();
	document.getElementById("main-container").innerHTML = content;

	if (page === "landing") {
		toogleMenuListener();
		darkModeListener();
		langSelectListener();
	} else {
		const response = await fetch(`/markdown/${page}.md`);
		const content = await response.text();
		const title = page !== "cgu" ? page : "privacy policy";
		document.getElementById("page-title").innerHTML =
			title.charAt(0).toUpperCase() + title.slice(1);
		document.getElementById("content").innerHTML = marked(content);
	}

	i18n.updateTranslations();
}

function toogleMenuListener() {
	const menuButton = document.querySelectorAll(".mobile-menu-button");
	const mobileMenu = document.querySelector('div[role="mobile-menu"]');
	const menu = document.getElementById("menu");
	const menuLinks = menu.querySelectorAll(".mobile-menu-link");

	[...menuButton, ...menuLinks].forEach((button) => {
		button.addEventListener("click", function () {
			mobileMenu.classList.toggle("invisible");
			menu.classList.toggle("translate-x-full");
		});
	});
}

function darkModeListener() {
	document
		.querySelectorAll("input[type='checkbox'].dark-toggle")
		.forEach((checkbox) => {
			checkbox.addEventListener("change", function () {
				document.querySelector("html").classList.toggle("dark");
				localStorage.setItem("makix-l-page-dark-mode", !this.checked);
			});
		});

	// Check local storage for dark mode preference
	const darkMode = localStorage.getItem("makix-l-page-dark-mode");
	if (darkMode === "false") {
		document
			.querySelectorAll("input[type='checkbox'].dark-toggle")[0]
			.click();
	}
}

function langSelectListener() {
	const lang = i18n.language;
	const selects = document.querySelectorAll("select.lang-select");
	selects.forEach((select) => {
		select.value = lang;
		select.addEventListener("change", function () {
			i18n.changeLanguage(select.value);
			localStorage.setItem("makix-l-page-lang", select.value);
		});
	});
}

// Optional: Handle errors globally (e.g., 404 page)
router.route("/404", "notFound", (routerInstance, params) => {
	document.getElementById("content").innerHTML = `
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>`;
});
