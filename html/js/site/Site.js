Site = function() {

	VirtualScroll.addEventListener(function(e) {
		// window.scroll(0, 1);
		Broadcast.send(Msg.SCROLL, e);
	});

	window.addEventListener("resize", function() {
		Broadcast.send(Msg.RESIZE);
	});

    document.addEventListener('touchmove', function(e) {
	    e.preventDefault();
	}, false);

	var render = function() {
		requestAnimationFrame(render);
		Broadcast.send(Msg.RENDER);
	}

	render();
}