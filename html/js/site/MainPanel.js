var MainPanel = function() {

	var active = true;

	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var main = 		Wrapper.select('#main');
	var header = 	Wrapper.select('#header');
	var projects = 	Wrapper.select('#projects');
	var play =  	Wrapper.select('#play');
	var boxes = 	Wrapper.selectAll('.box');
	var about = 	Wrapper.select('#about-btn');

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

	Broadcast.addClient(Msg.ON_ITEM_CLOSE, slideBack); 
	Broadcast.addClient(Msg.ON_ABOUT_CLOSE, slideBack); 

	Broadcast.addClient(Msg.SCROLL, onScroll); 
	Broadcast.addClient(Msg.RENDER, onRender); 
	Broadcast.addClient(Msg.RESIZE, onResize); 

	onResize();

	boxes.forEach(function(b) {

		var d = {};
		d.id = b.domElement().getAttribute('data-id');
		d.type = b.domElement().getAttribute('data-type');
		d.name = b.domElement().getAttribute('data-name');
		d.aspect = b.domElement().getAttribute('data-aspect');
		d.deps = b.domElement().getAttribute('data-deps').split(',');
		d.url = b.domElement().getAttribute('data-url');

		b.on("click", function(e) { 
			if(active) {
				Broadcast.send(Msg.ON_ITEM_OPEN, d); 
			} else {
				Broadcast.send(Msg.ON_ITEM_CLOSE); 
			}
		});
	});

	about.on("click", function(e) {
		if(active) {
			Broadcast.send(Msg.ON_ABOUT_OPEN); 
		} else {
			Broadcast.send(Msg.ON_ABOUT_CLOSE); 
		}	
	});
}















