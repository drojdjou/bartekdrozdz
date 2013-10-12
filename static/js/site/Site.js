window.Site = function(data) {

	if(Config.vscrollEnabled) {
		VirtualScroll.addEventListener(function(e) {
			Broadcast.send(Msg.SCROLL, e);
			window.scroll(10, 0);
		});

		document.addEventListener('touchmove', function(e) {
		    e.preventDefault();
		}, false);

		var render = function() {
			requestAnimationFrame(render);
			Broadcast.send(Msg.RENDER);
		}

		window.addEventListener("resize", function() {
			Broadcast.send(Msg.RESIZE);
		});

		render();
	}
}