var Anm = (function() {

	var anm = {};

	var now = function() {
		return new Date().getTime();
	}

	var runners = [], numRunners = 0, spareRunners = [];
	var timePadding = 0, lastTime;

	anm.create = function(from, to, duration) {
		var _delay = 0, _ease = Anm.LINEAR, _durationWithDelay = duration;

		var anim = {};

		anim.ease = function(func) {
			_ease = func;
			return anim;
		}

		anim.delay = function(d) {
			_delay = d;
			_durationWithDelay = duration + d;
			return anim;
		}

		anim.set = function(obj, prop) {

			var me = spareRunners.shift();

			if(!me) {
				me = {};

				me.update = function(t) {
					t = t - me.st;

					if(_delay && t < _delay) {
						if(prop) obj[prop] = from;
						if(me._onUpdate) me._onUpdate(from);
					} else if(t >= _durationWithDelay) {
						if(prop) obj[prop] = to;
						if(me._onUpdate) me._onUpdate(to);
						spareRunners.push(runners.splice(runners.indexOf(me), 1));
						numRunners = runners.length;
						if(me._onEnd) me._onEnd();
					} else {
						var v = from + (to - from) * _ease((t - _delay) / duration);
						if(prop) obj[prop] = v;
						if(me._onUpdate) me._onUpdate(v);
					}
				}

				me.onUpdate = function(cb) {
					me._onUpdate = cb;
					return me;
				}

				me.onEnd = function(cb) {
					me._onEnd = cb;
					return me;
				}

				me.start = function(st) {
					setTimeout(function() {
						me.st = now() - timePadding;
						runners.push(me);
						numRunners = runners.length;
					}, st | 0);
				}
			}

			return me;
		}
	
		return anim;
	}

	var rl = 0;

	anm.update = function() {
		var t = now();
		var i = numRunners;

		if(lastTime && t - lastTime > 100) {
			timePadding += t - lastTime;
			lastTime = t;
			return;
		}

		while(i--) {
			runners[i].update(t - timePadding);
		}

		lastTime = t;
	}

	// Interpolation equations from https://github.com/sole/tween.js
	anm.LINEAR = function(t) {
		return t
	};

	anm.SMOOTHSTEP = function(t) {
		return t * t * (3 - 2 * t);
	}

	anm.QUADIN = function(t) {
		return t * t;
	};

	anm.QUADOUT = function(t) {
		return t * (2 - t);
	};

	anm.QUADINOUT = function(t) {
		 if (( t *= 2 ) < 1) return 0.5 * t * t;
         return - 0.5 * (--t * ( t - 2 ) - 1);
	};

	return anm;
})();