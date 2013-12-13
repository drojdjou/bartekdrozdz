var Anm = (function() {

	var anm = {};
	var runnersCreated = 0;
	var runners = [], numRunners = 0, spareRunners = [];
	var timePadding = 0, lastTime;

	var now = function() {
		return new Date().getTime();
	}

	var Tween = function() {

		var me = this;
		var obj, properties, from, to, duration, _delay, _durationWithDelay, _ease;
		var localProps = [], numLocalProps;

		me.setup = function(_obj, _properties, _from, _to, _duration, __delay, __durationWithDelay, __ease) {
			obj = _obj;
			properties = _properties;
			from = _from;
			to = _to;
			duration = _duration; 
			_delay = __delay;
			_durationWithDelay = __durationWithDelay;
			_ease = __ease;

			localProps.length = 0;

			if(properties && !(properties instanceof Array)) {
				for(var pn in properties) {
					var p = properties[pn];
					if(p instanceof Array) {
						localProps.push({ name:pn, from:p[0], to:p[1] });
					} else {
						localProps.push({ name:pn, from:obj[pn], to:p });
					}
				}

				numLocalProps = localProps.length;
			}
		}

		var apply = function(v) {
			for(var i = 0; i < numLocalProps; i++) {
				var p = localProps[i];
				obj[p.name] = (p.from + (p.to - p.from) * v);
			}
		}

		me.update = function(t) {
			t = t - me.st;

			if(t >= _durationWithDelay) {
				if(properties) apply(to);
				if(me._onUpdate) me._onUpdate(to);
				me.cancel();
				if(me._onEnd) me._onEnd();
			} else {
				var inter = _ease((t - _delay) / duration);
				inter = Math.clamp01(inter);
				if(properties) apply(inter);
				if(me._onUpdate) me._onUpdate(from + (to - from) * inter);
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

		me.cancel = function() {

			if(spareRunners.indexOf(me) > -1) {
				console.log("Cancelling inactive event");
				return;
			}

			runners.splice(runners.indexOf(me), 1);
			spareRunners.push(me);
			numRunners = runners.length;
			return me;
		}

		var _start = function() {
			me.st = now() - timePadding;
			runners.push(me);
			numRunners = runners.length;
		};

		me.start = function(st) {
			if(properties) apply(from);
			if(me._onUpdate) me._onUpdate(from);
			(st) ? setTimeout(_start, st) : _start();
			return me;
		}
	}

	anm.create = function(duration, properties) {
		var _delay = 0, _ease = Anm.LINEAR, _durationWithDelay = duration;

		var anim = {};

		var from = 0, to = 1;
		if(properties instanceof Array) {
			from = properties[0], to = properties[1];
		}

		anim.ease = function(func) {
			_ease = func;
			return anim;
		}

		anim.delay = function(d) {
			_delay = d;
			_durationWithDelay = duration + d;
			return anim;
		}

		anim.applyTo = function(obj) {
			var me = spareRunners.shift() || new Tween();
			me.setup(obj, properties, from, to, duration, _delay, _durationWithDelay, _ease);
			return me;
		}
	
		return anim;
	}

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

	anm.LINEAR = function(t) {
		return t;
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
		return - 0.5 * (--t * (t - 2) - 1);
	};

	anm.EXPOOUT = function(t) {
		return t === 1 ? 1 : 1 - Math.pow( 2, - 10 * t );
	};
	
	return anm;
})();