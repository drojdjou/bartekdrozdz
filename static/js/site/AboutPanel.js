
window.AboutPanel = function() {

	var active = false;
	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var about = 		Wrapper.select('#about section');
	var close = 		Wrapper.select('#about .close');

	var onResize = function() {
		scrollMax = (about.height() < window.innerHeight) ? 0 : about.height() - window.innerHeight + Config.scrollMargin;
	}

	var onScroll = function(e) {
		if(!active) return;
		scrollTarget += e.deltaY;
	}

	var onRender = function() {
		if(!active) return;

		scrollTarget = Math.clamp(scrollTarget, -scrollMax, 0);
		scrollPos += (scrollTarget - scrollPos) * 0.2;
		about.move(0, scrollPos);
	}

	var fadeIn = function() {
		about.css("display", "block");
		active = true;
	}

	var fadeOut = function() {
		if(!active) return;
		active = false;
		hide();
	}

	var hide = function() {
		active = false;
		about.css("display", "none");
	}

	Broadcast.addClient(Msg.ON_ITEM_OPEN, hide); 
	Broadcast.addClient(Msg.ON_ABOUT_OPEN, fadeIn);
	Broadcast.addClient(Msg.ON_MAIN_OPEN, fadeOut); 

	Broadcast.addClient(Msg.SCROLL, onScroll); 
	Broadcast.addClient(Msg.RENDER, onRender); 
	Broadcast.addClient(Msg.RESIZE, onResize); 

	close.on("click", function() {
		Broadcast.send(Msg.ON_MAIN_OPEN);
	});

	onResize();
}














