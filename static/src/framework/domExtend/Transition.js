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

	var now = function() {
		return new Date().getTime();
	}

	ext.createTransition = function() {

		var transition = {};
		var tr = [], ts = [];
		var cb, numTrans;
		var startTime, maxTime = 0, finalized;

		var onEnded = function(e) {
			numTrans--;
			if(numTrans <= 0) {
				var t = now() - startTime;
				if(t >= maxTime) {
					finalize();
				} else if(!finalized) {
					// console.log("Transition early end > ", t, maxTime);
					setTimeout(finalize, t);
					finalized = true;
				}
			}
		};

		var finalize = function() {
			transition.clear();
			if(cb) cb();
		}

		var setValues = function(vals) {
			var nv = vals.length;

			for(var i = 0; i < nv; i++) {
				var p = vals[i][0], v = vals[i][1];
				if(p == TR) ext.transform(v);
				else element.style[p] = v;
			}

			return transition;
		};

		function propToCss(str) {
			return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
		}

		transition.add = function(property, to, time, ease, delay) {
			maxTime = Math.max(maxTime, time);
			ease = ease || Util.cssEase.ease;
			delay = delay || 0;
			tr.push([propToCss(property), time+'ms', ease, delay+'ms'].join(' '));
			ts.push([property, to]);

			return transition;
		}

		transition.trs = function(values, time, ease, delay) {
			maxTime = Math.max(maxTime, time);
			ease = ease || Util.cssEase.ease;
			delay = delay || 0;
			tr.push([Simplrz.prefix.css + "transform", time+'ms', ease, delay+'ms'].join(' '));
			ts.push([TR, values]);

			return transition;
		}

		transition.clear = function() {
			element.removeEventListener(trEvent, onEnded);
			tr = [];
			ts = [];
			element.style[Simplrz.prefix.js + "Transition"] = "";
			element.style["transition"] = "";
		}

		transition.start = function(callback) {
			cb = callback;
			numTrans = ts.length;

			element.addEventListener(trEvent, onEnded);

			// have to wait for properties to settle before applying the transition
			setTimeout(function() {
				startTime = now();
				finalized = false;
				element.style[Simplrz.prefix.js + "Transition"] = tr;
				element.style["transition"] = tr;
				setValues(ts);
			}, 0);

			return transition;
		};

		transition.then = function(callback) {
			var t = ext.createTransition();

			var c = function() {
				callback();
				t.start();
			}

			transition.start(c);

			return t;
		}

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


