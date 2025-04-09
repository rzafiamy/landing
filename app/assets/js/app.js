import Router from "./router.js";
import { marked } from "marked";
import i18n from "./i18n.js";
import "../css/main.css";

// Simulated auth check (replace with real logic)
const isAuthenticated = () => true;

// Initialize router
const router = new Router(isAuthenticated, "/");

// Define routes
router.route("/", "home", () => loadPageContent("landing"));
router.route("/about", "about", () => loadPageContent("about"));
router.route("/cgu", "cgu", () => loadPageContent("cgu"));
router.route("/demo", "demo", () => loadPageContent("demo"));
router.route("/download", "download", () => loadPageContent("download"));
router.route("/404", "notFound", () => loadPageContent("404"));

// Start router
router.start();
router.activateLinks();

// Template caching
var cachedTemplate = null;

async function getTemplate(page) {
	if (page === "landing") {
		const res = await fetch("/pages/landing.html");
		return await res.text();
	}
	if (!cachedTemplate) {
		const res = await fetch("/pages/template.html");
		cachedTemplate = await res.text();
	}
	return cachedTemplate;
}

// Main page content loader
async function loadPageContent(page) {
	showLoader(); // Loader appears immediately
	const container = document.getElementById("main-container");

	try {
		const templateContent = await getTemplate(page);
		container.classList.add("opacity-0"); // hide content during loading
		container.innerHTML = templateContent;

		if (page === "landing") {
			initMenuListener();
			initDarkMode();
			initLangSelector();
		} else {
			const response = await fetch(`/markdown/${page}.md`);
			const content = await response.text();

			if (
				!response.ok ||
				/<\/?(html|body|head|script|style)/i.test(content)
			) {
				throw new Error("Invalid markdown or fallback HTML received");
			}

			const title = page === "cgu" ? "Privacy Policy" : capitalize(page);
			document.getElementById("page-title").textContent = title;
			document.getElementById("content").innerHTML = marked(content);
		}

		// Re-apply dark mode, i18n etc.
		i18n.updateTranslations();

		// Now fade in the content
		requestAnimationFrame(() => {
			container.classList.remove("opacity-0");
		});
	} catch (error) {
		console.error("Error loading page content:", error);
		router.navigate("/404");
	} finally {
		// Fade out loader AFTER content is visible
		setTimeout(hideLoader, 100); // slight delay to smooth fade
	}
}



// Helper: Capitalize string
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// Mobile menu toggle
function initMenuListener() {
	const menuButton = document.querySelectorAll(".mobile-menu-button");
	const mobileMenu = document.querySelector('div[role="mobile-menu"]');
	const menu = document.getElementById("menu");
	const menuLinks = menu.querySelectorAll(".mobile-menu-link");

	const toggleMenu = () => {
		mobileMenu.classList.toggle("invisible");
		menu.classList.toggle("translate-x-full");
	};

	[...menuButton, ...menuLinks].forEach((el) => {
		el.removeEventListener("click", toggleMenu);
		el.addEventListener("click", toggleMenu);
	});
}

// Dark mode logic
function initDarkMode() {
	const toggles = document.querySelectorAll("input[type='checkbox'].dark-toggle");

	const applyDarkMode = (enabled) => {
		document.documentElement.classList.toggle("dark", enabled);
		toggles.forEach((cb) => (cb.checked = enabled));
	};

	const stored = localStorage.getItem("makix-l-page-dark-mode");
	const enabled = stored === null ? true : stored === "true";
	applyDarkMode(enabled);

	toggles.forEach((cb) => {
		cb.addEventListener("change", () => {
			const value = cb.checked;
			applyDarkMode(value);
			localStorage.setItem("makix-l-page-dark-mode", value);
		});
	});
}

function showLoader() {
	const loader = document.getElementById("page-loader");
	loader?.classList.remove("opacity-0", "pointer-events-none");
	loader?.classList.add("opacity-100");
}

function hideLoader() {
	const loader = document.getElementById("page-loader");
	loader?.classList.remove("opacity-100");
	loader?.classList.add("opacity-0", "pointer-events-none");
}


// Language selector
function initLangSelector() {
	const lang = i18n.language;
	const selects = document.querySelectorAll("select.lang-select");

	selects.forEach((select) => {
		select.value = lang;
		select.addEventListener("change", () => {
			const value = select.value;
			i18n.changeLanguage(value);
			localStorage.setItem("makix-l-page-lang", value);
		});
	});
}
