//Limits a value between start and end values.
Math.clamp = function(value, start, end) {
	if(value < start) return start;
	else if(value > end) return end;
	else return value;
};

//Limits a value between 0 and 1 .
Math.clamp01 = function(value) {
	if(value < 0) return 0;
	else if(value > 1) return 1;
	else return value;
};

// Rect = top/left/right/bottom - can be the object returned by element.getBoundingClientRect()
// Point = needs to have x/y property
Math.pointInRect = function(p, r) {
	return (p.x >= r.left && p.x <= r.right) && (p.y >= r.top && p.y <= r.bottom);
};

//Returns random number between minVal and maxVal.
Math.randomBtwn = function(minVal, maxVal) {
		return minVal + (Math.random() * (maxVal - minVal));
};

//Normalizes a number from another range into a value between 0 and 1. 
Math.norm = function(value , min, max){
	return (value - min) / (max - min);
};

//Re-maps a number from one range to another.
Math.map = function(value, min1, max1, min2, max2) {
	return Math.lerp(min2, max2, Math.norm(value, min1, max1));
};

//Calculates a number between two numbers at a specific increment.
Math.lerp = function(min, max, amt){
	return min + (max - min) * amt;
};

Math.hexToRgb = function(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
	} : null;
};

Util = {

	handleTap: function(element, callback) {

		var tapHandler = (function() {

			var th = {};
			var minTime = 20000;
			var startTime;
			var minDistSq = 100;
			var sx, sy;
			var el = element;
			var cb = callback;

			th.click = function(e) {
				e.preventDefault();
			} 

			th.touchStart = function(e) {
				e.preventDefault();

				startTime = new Date().getTime();
				sx = e.targetTouches[0].pageX;
				sy = e.targetTouches[0].pageY;
			}

			th.touchEnd = function(e) {
				e.preventDefault();

				var t = new Date().getTime() - startTime;

				var dx = e.changedTouches[0].pageX - sx;
				var dy = e.changedTouches[0].pageY - sy;
				var dsq = (dx*dx + dy*dy);

				if(t < minTime && dsq < minDistSq) cb.apply(el);
			}

			return th;

		})();

		element.addEventListener("touchstart", tapHandler.touchStart);
		element.addEventListener("touchend", tapHandler.touchEnd);
		element.addEventListener("click", tapHandler.click);

		return tapHandler;
	},

	delay: function(func, time, scope) {
		time = time || 0;
		setTimeout(function () {
			func.apply(scope);
		}, time);
	},

	debounce: function (func, wait) {
		var timeout, args, context, timestamp, result;
		return function () {
			context = this;
			args = arguments;
			timestamp = Date.now();
			var later = function () {
				var last = Date.now() - timestamp;
				if (last < wait) {
					timeout = setTimeout(later, wait - last);
				} else {
					timeout = null;
				}
			};
			if (!timeout) {
				timeout = setTimeout(later, wait);
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	},

	cssEase: {
		'ease': 'ease',
		'smoothstep': 'ease',
		'in': 'ease-in',
		'out': 'ease-out',
		'in-out': 'ease-in-out',
		'snap': 'cubic-bezier(0,1,.5,1)',
		'easeOutCubic': 'cubic-bezier(.215,.61,.355,1)',
		'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
		'easeInCirc': 'cubic-bezier(.6,.04,.98,.335)',
		'easeOutCirc': 'cubic-bezier(.075,.82,.165,1)',
		'easeInOutCirc': 'cubic-bezier(.785,.135,.15,.86)',
		'easeInExpo': 'cubic-bezier(.95,.05,.795,.035)',
		'easeOutExpo': 'cubic-bezier(.19,1,.22,1)',
		'easeInOutExpo': 'cubic-bezier(1,0,0,1)',
		'easeInQuad': 'cubic-bezier(.55,.085,.68,.53)',
		'easeOutQuad': 'cubic-bezier(.25,.46,.45,.94)',
		'easeInOutQuad': 'cubic-bezier(.455,.03,.515,.955)',
		'easeInQuart': 'cubic-bezier(.895,.03,.685,.22)',
		'easeOutQuart': 'cubic-bezier(.165,.84,.44,1)',
		'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
		'easeInQuint': 'cubic-bezier(.755,.05,.855,.06)',
		'easeOutQuint': 'cubic-bezier(.23,1,.32,1)',
		'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
		'easeInSine': 'cubic-bezier(.47,0,.745,.715)',
		'easeOutSine': 'cubic-bezier(.39,.575,.565,1)',
		'easeInOutSine': 'cubic-bezier(.445,.05,.55,.95)',
		'easeInBack': 'cubic-bezier(.6,-.28,.735,.045)',
		'easeOutBack': 'cubic-bezier(.175, .885,.32,1.275)',
		'easeInOutBack': 'cubic-bezier(.68,-.55,.265,1.55)'
	}

};





