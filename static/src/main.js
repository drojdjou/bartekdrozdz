// After JS is loaded
window.addEventListener('load', function() {

	if(Simplrz.ie && Simplrz.ie <= 9) {
		document.location = document.location.href + "?ns";
		return;
	}

	Site(rawData);

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-46599235-1', 'bartekdrozdz.com');
	
	Application.on(MSG.ROUTE, function(e) {
		// console.log("Route", e);
		ga('send', 'pageview');
	});

});