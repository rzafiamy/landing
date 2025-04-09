//------------------------------------------------------------------------
// router.js
//------------------------------------------------------------------------

function Router(isAuthenticated, redirectPath = "/") {
	this.routes = {};
	this.currentRoute = null;
	this.isAuthenticated = isAuthenticated || (() => false); // Default to always authenticated if not provided
	this.redirectPath = redirectPath;
}

//------------------------------------------------------------------------
// Add a new route and its associated callback to the routing table
// The callback will be invoked whenever the application is navigated to
// 'path'
//------------------------------------------------------------------------

Router.prototype.route = function (
	path,
	name,
	callback,
	search = false,
	secure = true,
) {
	const paramNames = [];

	const regexPath = path.replace(/<([^<>]+)>/g, (_, paramName) => {
		paramNames.push(paramName);
		return "([^/]+)";
	});

	this.routes[path] = {
		callback,
		regex: new RegExp(`^${regexPath}$`),
		paramNames,
		secure, // Indicates if this route requires authentication
	};

	// Handling search parameter variations
	if (search) {
		path = path.replace(/^\/|\/$/, "");

		if (path === "") {
			path = "/search";
		} else {
			path = "/search/" + path;
		}

		// call the route function for /search/path/<query> , /search/path/ and /search/path
		this.route(path + `/<query>`, name + "_1", callback, false, secure);
		this.route(path, name + "_2", callback, false, secure);
		this.route(path + `/`, name + "_3", callback, false, secure);
	}
};

//------------------------------------------------------------------------
// Perform the necessary routing actions when the application is navigated
// to 'path'
//------------------------------------------------------------------------

Router.prototype.navigate = function (path) {
	if (!path) return;

	// compare current path with the new path
	//if (this.currentRoute === path) return;

	for (const routePath in this.routes) {
		const route = this.routes[routePath];
		const match = path.match(route.regex);

		if (match) {
			const params = {};
			route.paramNames.forEach((paramName, index) => {
				params[paramName] = match[index + 1];
			});

			// Check authentication if route is secure
			if (route.secure && !this.isAuthenticated()) {
				this.navigate(this.redirectPath); // Redirect if not authenticated
				return;
			}

			this.currentRoute = path;
			route.callback(this, params);
			window.history.pushState(null, null, path);
			return;
		}
	}

	// Handle 404 or default route here
	this.navigate("/");
};

//------------------------------------------------------------------------
// Start listening for navigation events
//------------------------------------------------------------------------
Router.prototype.start = function (beforeNavigate) {
	window.addEventListener("popstate", () => {
		this.currentRoute = window.location.pathname;
		this.handleRoute(beforeNavigate);
	});

	this.handleRoute(beforeNavigate);
};

Router.prototype.activateLinks = function () {
	document.querySelectorAll("a.kero-nav").forEach((link) => {
		const href = link.getAttribute("href");
		if (href) link.setAttribute("js-href", href);
		link.removeAttribute("href");
		link.addEventListener("click", (event) => {
			event.preventDefault();
			this.navigate(link.getAttribute("js-href"));
		});
	});
};

//------------------------------------------------------------------------
// Handle the current route
//------------------------------------------------------------------------
Router.prototype.handleRoute = function (beforeNavigate) {
	const path = window.location.pathname;
	for (const routePath in this.routes) {
		const route = this.routes[routePath];
		const match = path.match(route.regex);
		if (match) {
			const params = {};
			route.paramNames.forEach((paramName, index) => {
				params[paramName] = match[index + 1]; // Skip the first match which is the full path
			});

			if (route.secure && !this.isAuthenticated()) {
				this.navigate(this.redirectPath);
				return;
			}

			this.currentRoute = path;
			if (beforeNavigate) beforeNavigate();
			route.callback(this, params);
			return;
		}
	}

	// Handle 404 or default route here
	// redirect to / if not found
	this.navigate("/");
};

//------------------------------------------------------------------------
// Get the current route
//------------------------------------------------------------------------
Router.prototype.getCurrentRoute = function () {
	return this.currentRoute;
};

//------------------------------------------------------------------------
// Go back to the previous route
//------------------------------------------------------------------------
Router.prototype.goBack = function () {
	// go back to the previous route if not yet at / root
	if (this.currentRoute !== "/") {
		// if route is /<something> then go back to /
		if (this.currentRoute.match(/^\/[^\/]+$/)) {
			this.navigate("/");
		} else {
			window.history.back();
		}
	}
};

//------------------------------------------------------------------------
// Reload the current route
//------------------------------------------------------------------------
Router.prototype.reload = function () {
	// Disable scrolling
	this.freezeScrolling();

	// Perform the route handling
	this.handleRoute();

	// Re-enable scrolling
	this.unfreezeScrolling();
};

// Utility methods to freeze and unfreeze scrolling
Router.prototype.freezeScrolling = function () {
	// Add a style to prevent scrolling
	document.body.style.overflow = "hidden";
};

Router.prototype.unfreezeScrolling = function () {
	// Remove the style to restore scrolling
	document.body.style.overflow = "";
};

export default Router;
