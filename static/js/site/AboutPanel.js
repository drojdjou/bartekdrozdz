
window.AboutPanel = function() {

	var active = false;
	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var about = 		Wrapper.select('#about section');
	var close = 		Wrapper.select('#about .close');
	var container3d = 	Wrapper.select('#about section > div');
	var panels = 		Wrapper.selectAll('#about .panel');

	var setTranstionClass = function(t) {
		if(t) {
			container3d.addClass("animated");
		} else {
			container3d.rmClass("animated");
		}
	}

	var onResize = function() {
		scrollMax = (about.height() < window.innerHeight) ? 0 : about.height() - window.innerHeight;
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

	var show = function() {
		active = true;

		container3d.rotate(0, 0, 0);
		container3d.move(0, 0, 0);
		container3d.css("opacity", 1);
	}

	var hide = function() {
		if(!active) return;

		container3d.rotate(0, -90, 0);
		var offset = (window.innerWidth > 500) ? 500 : window.innerWidth;
		container3d.move(-offset, 0, 0);
		container3d.css("opacity", 0);

		active = false;
		hide();
	}

	Broadcast.addClient(Msg.NAVIGATE, function(e) {
		setTranstionClass(e.history.length > 0);
		if(e.parts[0] == "about") show();
		else hide();
	}); 

	Broadcast.addClient(Msg.SCROLL, onScroll); 
	Broadcast.addClient(Msg.RENDER, onRender); 
	Broadcast.addClient(Msg.RESIZE, onResize); 

	var offset = (window.innerWidth > 500) ? 500 : window.innerWidth;
	container3d.move(-offset, 0, 0);
	container3d.rotate(0, -90, 0);

	onResize();
}














