Easer = function(e) {

	var ease = e || 1;

	var pos = 0, target = 0, min = -100000000, max = 1000000000;
	var MAXDELTA = 100000;
	
	var e = {
		velocity: 0
	};

	e.setTarget = function(_target) {
		target = _target;
	}

	e.getTarget = function() {
		return target;
	}

	e.updateTarget = function(delta) {
		target += delta;
	}

	e.setLimits = function(_min, _max) {
		min = _min;
		max = _max;
	}

	e.easeVal = function() {
		target = Math.clamp(target, min, max);
		e.velocity = (target - pos) * ease;
        pos += e.velocity;
        return pos;
	}

	e.setEase = function(e) {
		ease = e;
	}

	e.reset = function(val) {
		pos = val || 0;
		target = val || 0;
	}
	
	return e;
}