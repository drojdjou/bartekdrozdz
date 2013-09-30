window.VirtualScroll = (function(document) {

	var vs = {};

	var numListeners, listeners = [];

	var touchStartX, touchStartY, touchMult = 2;
	var mozMult = -6;

	var event = {
		y: 0,
		x: 0,
		deltaX: 0,
		deltaY: 0
	};

	vs.addEventListener = function(f) {
		listeners.push(f);
		numListeners = listeners.length;
	}

	var notify = function() {
		for(var i = 0; i < numListeners; i++) {
			listeners[i](event);
		}
	}

	document.addEventListener("mousewheel", function(e) {
		e.preventDefault();
		event.y += e.wheelDeltaY;
		event.deltaY = e.wheelDeltaY;
		notify();		
	});

	document.addEventListener("DOMMouseScroll", function(e) {
		e.preventDefault();
		event.y += e.detail * mozMult;
		event.deltaY = e.detail * mozMult;
		notify();		
	});

	document.addEventListener("touchstart", function(e) {
		touchStartX = e.targetTouches[0].pageX;
		touchStartY = e.targetTouches[0].pageY;
	});

	document.addEventListener("touchmove", function(e) {
		e.preventDefault();

		var v = (e.targetTouches[0].pageY - touchStartY) * touchMult;
		event.y += v;
		event.deltaY = v;
		touchStartY = e.targetTouches[0].pageY;

		// if(event.y > 1000) window.scroll(0, 1);
		// else window.scroll(0, 0);

		notify();
	});

	return vs;
})(document);