window.VirtualScroll = (function(document) {

	var vs = {};

	var numListeners, listeners = [], initialized = false;

	var touchStartX, touchStartY, touchMult = 2;
	var mozMult = -8;

	var event = {
		y: 0,
		x: 0,
		deltaX: 0,
		deltaY: 0
	};

	vs.addEventListener = function(f) {
		if(!initialized) initListeners(); 
		listeners.push(f);
		numListeners = listeners.length;
	}

	/**
	 *	Firefox will not fire mouse wheel events when mouse is over an iframe. 
	 *	Workaround - listen to mouse wheel event in the iframe and forward it here.
	 */
	vs.invokeFirefox = function(e) {
		event.y += e.detail * mozMult;
		event.deltaY = e.detail * mozMult;
		notify();
	}

	var notify = function() {
		for(var i = 0; i < numListeners; i++) {
			listeners[i](event);
		}
	}

	var initListeners = function() {

		var wheelFunc = function(e, dy) {
			e.preventDefault();
			event.y += dy;
			event.deltaY = dy;
			notify();
		}

		document.addEventListener("mousewheel", function(e) {
			wheelFunc(e, e.wheelDeltaY);		
		});

		document.addEventListener("DOMMouseScroll", function(e) {
			wheelFunc(e, e.detail * mozMult);		
		});

		document.addEventListener("touchstart", function(e) {
			var t0 = e.targetTouches[0];
			touchStartX = t0.pageX;
			touchStartY = t0.pageY;
		});

		document.addEventListener("touchmove", function(e) {
			var t0 = e.targetTouches[0];
			wheelFunc(e, (t0.pageY - touchStartY) * touchMult);
			touchStartY = t0.pageY;
		});

		initialized = true;
	}

	return vs;
})(document);
