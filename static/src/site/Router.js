window.Router = function() {

	var href, base, history = [];

	var setRoute = function (r) {
		href = base + '#/' + r;
		document.location.href = href;
	};

	var getRoute = function() {
		href = document.location.href;
		var r = href.indexOf("#");
		var route = (r > -1) ? href.substring(r + 1) : "";
		if(!base) base = (r > -1) ? href.substring(0, r) : href;
		Broadcast.send(Msg.NAVIGATE, {
			history: history,
			parts: route.substring(1).split("/")
		});
		history.push(route);
	}

	Broadcast.on(Msg.NAVIGATE, function(e) {
		setRoute(e.parts.join("/"));
	});

	setInterval(function () {
		if (document.location.href != href) getRoute();
	}, 100);

	getRoute();
};






