FJ.Router = new (function () {
	"use strict";

	var that = this;

	var _defaultSlug = " ";
	var HASH_CHECK_INTERVAL = 100;

	var currentHref = document.location.href;
	var hs = currentHref.indexOf("#");
	var baseURL = (hs > 0) ? currentHref.substring(0, hs) : currentHref;

	var getSlug = function () {
		var hs = currentHref.indexOf("#");
		var cu = currentHref.substring(hs + 2);
		return (hs > 0 && hs != currentHref.length - 1) ? cu : _defaultSlug;
	};

	var updateSlug = function (slug) {
		FJ.Application.slug = slug;
		currentHref = baseURL + '#/' + slug;
		document.location.href = currentHref;
	};

	this.start = function (defaultSlug) {
		_defaultSlug = defaultSlug;

		that.navigateBySlug = new FJ.Notification(FJ.MSG_NAVIGATE, FJ.NOTIF_NAVIGATION, getSlug());

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

})();