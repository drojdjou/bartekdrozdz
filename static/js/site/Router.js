window.Router = function() {

	var router = {};
	var HASH_CHECK_INTERVAL = 100;

	var href, route, base;

	var setRoute = function (r) {
		route = r;
		href = base + '#' + route;
		document.location.href = href;
	};

	var getRoute = function() {
		href = document.location.href;
		var r = href.indexOf("#");
		route = href.substring(r + 1);
		if(!base) base = (route.length > 0) ? href.substring(0, r) : href;
	}

	// This method expects the contents from the URL after the #, not including #
	var solveRoute = function() {
		if(route.indexOf("/about") == 0) Broadcast.send(Msg.ON_ABOUT_OPEN);
		else if(route.indexOf("/project") == 0) Broadcast.send(Msg.ON_ITEM_OPEN, route.split("/")[2]);
		else Broadcast.send(Msg.ON_MAIN_OPEN);
	}

	Broadcast.addClient(Msg.ON_MAIN_OPEN, function(data) {
		setRoute("/");
	});

	Broadcast.addClient(Msg.ON_ABOUT_OPEN, function(data) {
		setRoute("/about");
	}); 

	Broadcast.addClient(Msg.ON_ITEM_OPEN, function(data) {
		setRoute("/project/" + data);
	});

	getRoute();
	solveRoute();

	setInterval(function () {
		if (document.location.href != href) {
			getRoute();
			solveRoute(route);
		}
	}, HASH_CHECK_INTERVAL);
};






