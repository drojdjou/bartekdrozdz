
window.AboutPanel = function() {

	var active = false;
	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var about = 		Wrapper.select('#about section');
	var close = 		Wrapper.select('#about .close');
	var container3d = 	Wrapper.select('#about section > div');
	var panels = 		Wrapper.selectAll('#about .panel');

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
		active = true;

		container3d.e().setAttribute("class", "animated");
		container3d.rotate(0, 0, 0);
		container3d.move(0, 0, 0);
		container3d.css("opacity", 1);
	}

	var fadeOut = function() {
		if(!active) return;

		container3d.rotate(0, -90, 0);
		var offset = (window.innerWidth > 500) ? 500 : window.innerWidth;
		container3d.move(-offset, 0, 0);
		container3d.css("opacity", 0);

		active = false;
		hide();
	}

	var hide = function() {
		active = false;
	}

	Broadcast.addClient(Msg.ON_ITEM_OPEN, hide); 
	Broadcast.addClient(Msg.ON_ABOUT_OPEN, fadeIn);
	Broadcast.addClient(Msg.ON_MAIN_OPEN, fadeOut); 

	Broadcast.addClient(Msg.SCROLL, onScroll); 
	Broadcast.addClient(Msg.RENDER, onRender); 
	Broadcast.addClient(Msg.RESIZE, onResize); 

	// close.on(Config.click, function() {
	// 	Broadcast.send(Msg.ON_MAIN_OPEN);
	// });

	var offset = (window.innerWidth > 500) ? 500 : window.innerWidth;
	container3d.move(-offset, 0, 0);
	container3d.rotate(0, -90, 0);

	onResize();
}














