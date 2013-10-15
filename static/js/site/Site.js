window.Site = function(data) {

	// RL.setRlc("bdcom");
	// RL.log("Site()");

	Config.click = (Simplrz.touch) ? "tap" : "click";

	if(Config.vscrollEnabled) {

		window.scroll(0, 1);

		VirtualScroll.addEventListener(function(e) {
			Broadcast.send(Msg.SCROLL, e);
		});

		window.addEventListener("resize", function() {
			Broadcast.send(Msg.RESIZE);
		});
	
		var render = function() {
			requestAnimationFrame(render);
			Broadcast.send(Msg.RENDER);
		}

		render();
	}
}