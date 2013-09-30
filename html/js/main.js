var main, header, projects, play, boxes;

var scrollPos = 0, scrollTarget = 0, scrollMax;

var aboutOpen = false, detailOpen = false;

function updatePositions() {

	requestAnimationFrame(updatePositions);

	scrollTarget = Math.clamp(scrollTarget, -scrollMax, 0);
	scrollPos += (scrollTarget - scrollPos) * 0.2;

	header.move(0, scrollPos);
	projects.move(0, scrollPos);
	play.move(0, scrollPos);	
}

window.onload = function() {	
	require([
		"js/lib/modernizr", 
		"js/lib/requestAnimFrame", 
		"js/lib/wrapper", 
		"js/lib/virtualscroll",
		"js/lib/xmath"
	], function() {

		main = new Wrapper(document.querySelector("#main"));
		header = new Wrapper(document.querySelector("#header"));
		projects = new Wrapper(document.querySelector("#projects"));
		play = new Wrapper(document.querySelector("#play"));

		boxes = Wrapper.wrapAll(document.querySelectorAll(".box"));

		for(var i = 0; i < boxes.length; i++) {

			boxes[i].image = boxes[i].domElement().querySelector("img");

			boxes[i].domElement().addEventListener("click", (function() {
				return function(e) {
					aboutOpen = !aboutOpen;

					var offset = window.innerWidth - 100;

					if(aboutOpen) {
						main.move(-offset, 0);
						main.css("webkitFilter", "grayscale(100%)");
					} else {
						main.move(0, 0);
						main.css("webkitFilter", "");
					}
				}
			})());
		}

		window.addEventListener("resize", function() {
			scrollMax = main.height() - window.innerHeight;
		});

		scrollMax = main.height() - window.innerHeight;

		VirtualScroll.addEventListener(function(e) {
			if(aboutOpen || detailOpen) return;
			scrollTarget += e.deltaY;
		});

		document.querySelector("#about-btn").addEventListener("click", (function() {
			return function(e) {
				aboutOpen = !aboutOpen;

				var offset = (window.innerWidth > 500) ? 500 : window.innerWidth;

				if(aboutOpen) {
					main.move(offset, 0);
					main.css("-webkit-filter", "grayscale(100%)");
				} else {
					main.move(0, 0);
					main.css("-webkit-filter", "");
				}
			}

		})());

		updatePositions();

	});
}












