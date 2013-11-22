window.Site = function(data) {

	// RL.setRlc("bdcom");
	// RL.log("Site()");

	window.Config = {};
	Config.click = (Simplrz.touch) ? "tap" : "click";

	document.querySelector('#content').style.pointerEvents = "none";

	var mouse = {
		x: 0, y: 0
	};

	window.scroll(0, 1);

	VirtualScroll.addEventListener(function(e) {
		Broadcast.send(Msg.SCROLL, e);
	});

	window.addEventListener("resize", function() {
		Broadcast.send(Msg.RESIZE);
	});

	window.addEventListener("mousemove", function(e) {
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	});

	window.addEventListener("touchmove", function(e) {
		e.preventDefault();
	});


	var render = function() {
		requestAnimationFrame(render);
		Broadcast.send(Msg.RENDER, mouse);
	}

	render();
}