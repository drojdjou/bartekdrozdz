Router = new function () {

	var HASH_CHECK_INTERVAL = 100;
	var href = document.location.href;
	var route = currentHref.indexOf("#");
	var base = (route > 0) ? href.substring(0, hs) : href;

	var getSlug = function () {
		var hs = currentHref.indexOf("#");
		var cu = currentHref.substring(hs + 2);
		return (hs > 0 && hs != currentHref.length - 1) ? cu : _defaultSlug;
	};

	var updateSlug = function (route) {
		href = baseURL + '#' + route;
		document.location.href = href;
	};

	this.start = function (defaultSlug) {
		setInterval(function () {
			if (document.location.href != currentHref) {
				currentHref = document.location.href;
				that.navigateBySlug.slug = getSlug();
				FJ.Application.broadcast(that.navigateBySlug);
			}
		}, HASH_CHECK_INTERVAL);
	};

	this.init = function () {
		FJ.Application.createMediator('router').update = function (n) {
			if (n.type == FJ.NOTIF_NAVIGATION) {
				updateSlug(n.slug);
			}
		};
	}

};