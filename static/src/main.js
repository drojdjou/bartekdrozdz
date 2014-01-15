// After JS is loaded
window.addEventListener('load', function() {

	if(Simplrz.ie && Simplrz.ie <= 9) {
		document.location = document.location.href + "?ns";
		return;
	}

	Site(rawData);

	Application.on(MSG.ROUTE, function(e) {
		setTimeout(function() {
			if(ga) ga('send', 'pageview');
		}, 10);
	});

});