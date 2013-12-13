Transition = function(ext, element) {

	var events = {
		'transition': 'transitionEnd',
		'Moz': 'transitionend',
		'O': 'oTransitionEnd',
		'Webkit': 'webkitTransitionEnd',
		'Ms': 'MSTransitionEnd'
	};

	var trEvent = events[Simplrz.prefix.js];
	var TR = "transform";

	ext.createTransition = function() {

		var transition = {};
		var tr = [], ts = [];
		var cb, numTrans;

		var onEnded = function(e) {
			numTrans--;
			if(numTrans <=0) {
				transition.clear();
				if(cb) cb(e);
			}
		};

		var setValues = function() {
			for(var i = 0; i < numTrans; i++) {
				var p = ts[i][0], v = ts[i][1];
				if(p == TR) ext.transform(v);
				else element.style[p] = v;
			}
		};

		transition.add = function(property, to, time, ease, delay) {
			ease = ease || Util.cssEase.ease;
			delay = delay || 0;
			tr.push([property, time+'ms', ease, delay+'ms'].join(' '));
			ts.push([property, to]);

			return transition;
		};

		transition.trs = function(values, time, ease, delay) {
			ease = ease || Util.cssEase.ease;
			delay = delay || 0;
			tr.push([Simplrz.prefix.css + "transform", time+'ms', ease, delay+'ms'].join(' '));
			ts.push([TR, values]);

			return transition;
		};

		transition.clear = function() {
			element.removeEventListener(trEvent, onEnded);
			tr = [];
			ts = [];
			element.style[Simplrz.prefix.js + "Transition"] = "";
		}

		transition.start = function(callback) {
			cb = callback;
			numTrans = ts.length;

			// not needed
			// var trs = tr.join(', ');

			element.addEventListener(trEvent, onEnded);

			// have to wait for properties to settle before applying the transition
			setTimeout(function(){
				element.style[Simplrz.prefix.js + "Transition"] = tr;
				// element.style["transition"] = trs;
				setValues();
			}, 0);

			return transition;
		};

		return transition;

	};

	ext.transition = function(properties, time, ease, delay, callback) {
		var t = ext.createTransition();

		for(var p in properties) {
			var v = properties[p];
			if(p == TR) t.trs(v, time, ease, delay);
			else t.add(p, v, time, ease, delay);
		}

		t.start(callback);
		return t;
	}
};


