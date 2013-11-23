window.MainPanel = function() {

	var active = true;
	var side = 0;

	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var main = 		Wrapper.select('#main');

	var header = 	Wrapper.select('#header');
	var projects = 	Wrapper.select('#projects');
	var footer =  	Wrapper.select('#footer');
	var boxes = 	Wrapper.selectAll('.box');

	var setTranstionClass = function(t) {
		if(t) {
			main.addClass("animated");
		} else {
			main.rmClass("animated");
		}
	}

	var onResize = function() {
		scrollMax = main.height() - window.innerHeight;

		// TODO: Fix code reptition (with slideLeft and slideRight methods)
		switch(side) {
			case 1:
				var offset = (window.innerWidth > 500) ? 500 : window.innerWidth;
				main.move(offset, 0);
			break;
			case -1:
				var offset = -window.innerWidth;
				main.move(offset, 0);
			break;
		}
	}

	var onScroll = function(e) {
		if(!active) return;
		scrollTarget += e.deltaY;
	}

	var onRender = function() {
		if(!active) return;

		scrollTarget = Math.clamp(scrollTarget, -scrollMax, 0);
		var velocity = (scrollTarget - scrollPos) * 0.2;
		scrollPos += velocity;

		var scr = scrollPos | 0;

		header.move(0, scr * 0.85);
		projects.move(0, scr);
		footer.move(0, scr);
	}


	var slideBack = function() {
		if(active) return;
		main.move(0, 0);
		active = true;
		side = 0;
	}

	var slideRight = function() {
		var offset = (window.innerWidth > 500) ? 500 : window.innerWidth;
		main.move(offset, 0);
		active = false;
		side = 1;
	}

	var slideLeft = function() {
		var offset = -window.innerWidth;
		main.move(offset, 0);
		active = false;
		side = -1;
	}

	Broadcast.on(Msg.NAVIGATE, function(e) {
		setTranstionClass(e.history.length > 0);

		switch(e.parts[0]) {
			case "about":
				slideRight();
				break;
			case "project":
				slideLeft();
				break;
			case "":
				slideBack();
				break;
		}
	}); 

	Broadcast.on(Msg.SCROLL, onScroll); 
	Broadcast.on(Msg.RESIZE, onResize); 
	Broadcast.on(Msg.RENDER, onRender); 

	boxes.forEach(function(b) {
		b = Box(b);
		b.current = b.target = 0;
	});

	onResize();
};















