HistoryRouter = function (broadcast) {

	var rootUrl = document.location.protocol + '//' + (document.location.hostname || document.location.host);
	if(document.location.port) rootUrl += ":" + document.location.port;

	var route, prevRoute;

	var hijackLinks = function () {
		if (!Simplrz.history) return;

		var allLinksSelector = 'a[href]';
		var allLinks = EXT.selectAll(allLinksSelector);

		for (var i = 0; i < allLinks.length; i++) {
			var link = allLinks[i];

			var url = link.ext.attr('href');
			var target = link.ext.attr('target');
			var hj = link.ext.attr('data-hj');

			if(url.indexOf(':') > -1 || target == '_blank' || hj == "no") {
				// Skip absolute URLs, those that have a _blank target 
				// and those that are explicitely set to not be hijacked
				// (this is done by adding an attribute like this: data-hj='no')

				// console.log('HistoryRouter.hijackLinks: skipping', url);
				continue;
			}
			
			if (!link.hijacked) {
				link.hijacked = true;

				var cb = function (e) {
					if(e) e.preventDefault();
					pushState(this.href);
				}

				if(Simplrz.touch) {
					Util.handleTap(link, cb);
				} else {
					link.addEventListener('click', cb);
				}
			}
		}
	};

	// Some browser fire the popstate event on start others don't.
	// Those who don't need help, and this is what the setTimeout below is for.
	// but it can't be called twice, so we also need this flag./
	// It's mostly for Chrome <33, so in the future this can be removed (maybe).
	var historyAPIInitiated = false;

	var notify = function() {
		var r = route.substring(rootUrl.length);
		var p = r.split("/");
		p.shift(); // Remove the first empty element

		broadcast.trigger(MSG.ROUTE, {
			route: r,
			parts: p,
			prevRoute: prevRoute
		});
	}

	var pushState = function (href) {
		if (Simplrz.history) history.pushState(null, null, href);
		prevRoute = (route) ? route.replace(rootUrl, "") : null;
		route = document.location.href;
		notify();
	};

	window.addEventListener('popstate', function(e) {
		historyAPIInitiated = true;
		prevRoute = (route) ? route.replace(rootUrl, "") : null;
		route = document.location.href;
		notify();
	});

	broadcast.on(MSG.HIJACK_LINKS, hijackLinks);
	broadcast.on(MSG.NAVIGATE, pushState);

	setTimeout(function() {
		if(!historyAPIInitiated) pushState();
		else console.log("History initiated, no manual push.")
	}, 20, document.location.href);

	return {
		init: function () {
			hijackLinks();
		}
	}
};