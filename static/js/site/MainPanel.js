window.MainPanel = function() {

	var active = true;

	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var main = 		Wrapper.select('#main');
	var header = 	Wrapper.select('#header');
	var projects = 	Wrapper.select('#projects');
	var play =  	Wrapper.select('#play');
	var boxes = 	Wrapper.selectAll('.box');
	var about = 	Wrapper.select('#about-btn');

	var toggleMainSlidingAnimation = function(t) {
		if(t) {
			main.domElement().setAttribute("class", "animated");
		} else {
			main.domElement().setAttribute("class", "");
		}
	}

	var onResize = function() {
		scrollMax = main.height() - window.innerHeight;
	}

	var onScroll = function(e) {
		if(!active) return;
		scrollTarget += e.deltaY;
	}

	var onRender = function() {
		if(!active) return;

		scrollTarget = Math.clamp(scrollTarget, -scrollMax, 0);
		scrollPos += (scrollTarget - scrollPos) * 0.2;

		header.move(0, scrollPos);
		projects.move(0, scrollPos);
		play.move(0, scrollPos);
	}

	var slideBack = function() {
		if(active) return;

		main.move(0, 0);
		main.css("-webkit-filter", "");
		active = true;
	}

	var slideRight = function() {
		var offset = (window.innerWidth > 500) ? 500 : window.innerWidth;
		main.move(offset, 0);
		main.css("-webkit-filter", "grayscale(100%) brightness(0.8)");
		active = false;
	}

	var slideLeft = function() {
		var offset = -window.innerWidth;
		main.move(offset, 0);
		main.css("-webkit-filter", "grayscale(100%) brightness(0.8)");
		active = false;
	}

	Broadcast.addClient(Msg.ON_ITEM_OPEN, slideLeft); 
	Broadcast.addClient(Msg.ON_ABOUT_OPEN, slideRight);

	Broadcast.addClient(Msg.ON_MAIN_OPEN, slideBack); 

	Broadcast.addClient(Msg.SCROLL, onScroll); 
	Broadcast.addClient(Msg.RENDER, onRender); 
	Broadcast.addClient(Msg.RESIZE, onResize); 

	boxes.forEach(function(b) {

		b = Box(b);

		b.on("click", function(e) { 
			if(active) {
				Broadcast.send(Msg.ON_ITEM_OPEN, b.id); 
			} 
		});
	});

	about.on("click", function(e) {
		if(active) {
			Broadcast.send(Msg.ON_ABOUT_OPEN); 
		} else {
			Broadcast.send(Msg.ON_MAIN_OPEN); 
		}	
	});

	onResize();
	toggleMainSlidingAnimation(true);
};















