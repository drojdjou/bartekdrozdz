window.Wrapper = function(e) {

	var that = this;

	var TAP = "tap";
	var hw = true;
	var element = e;
	var px = 0, py = 0, pz = 0;
	var rx = 0, ry = 0, rz = 0;
	var sx = 1, sy = 1;

	var applyTransform = function() {
		var t = "translate3d(" + px + "px," + py + "px," + pz + "px) ";
		var s = "scale(" + sx + "," + sy + ") ";
		var r = "rotateX(" + rx + "deg) rotateY(" + ry + "deg) rotateZ(" + rz + "deg)";
		element.style.webkitTransform = t + s + r;
		element.style.msTransform = t + s + r;
		element.style.transform = t + s + r;
	}

	this.move = function(x, y, z) {
		px = x || 0;
		py = y || 0;
		pz = z || 0;
		applyTransform();
	}

	this.rotate = function(x, y, z) {
		rx = x || 0;
		ry = y || 0;
		rz = z || 0;
		applyTransform();
	}

	this.scale = function(x, y) {
		sx = (x !== null) ? x : 1;
		sy = (y !== null) ? y : 1;
		applyTransform();
	}

	this.moveBy = function(x, y, z) {
		px += x || 0;
		py += y || 0;
		pz += z || 0;
		applyTransform();
	}

	/** Deprecated (?), user rect().height **/
	this.height = function() {
		// return element.offsetHeight;
		return element.scrollHeight;
	}

	this.rect = function() {
		return element.getBoundingClientRect();
	}

	this.position = function() {
	    var el = element;
	    for (var lx=0, ly=0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
	    return { x: lx, y: ly };
	}

	this.css = function(p, v) {
		if(!p) return element.style;
		else element.style[p] = v;
	}

	this.e = function() {
		return element;
	}

	this.on = function(m, f) {
		// TODO move tap handling to a separate utility
		if(m == TAP) {

			f.tapHandler = (function() {

				var th = {};
				var minTime = 20000;
				var startTime;
				var minDistSq = 100;
				var sx, sy;

				th.touchStart = function(e) {
					startTime = new Date().getTime();
					sx = e.targetTouches[0].pageX;
					sy = e.targetTouches[0].pageY;
				}

				th.touchEnd = function(e) {
					var t = new Date().getTime() - startTime;

					var dx = e.changedTouches[0].pageX - sx;
					var dy = e.changedTouches[0].pageY - sy;
					var dsq = (dx*dx + dy*dy);

					if(t < minTime && dsq < minDistSq) f();
				}

				return th;

			})();

			element.addEventListener("touchstart", f.tapHandler.touchStart);
			element.addEventListener("touchend", f.tapHandler.touchEnd);

		} else {
			element.addEventListener(m, f);
		}
	}

	this.off = function(m, f) {
		element.removeEventListener(m, f);
	}

	this.addClass = function(c) {
		classes.push(c);
		that.attr("class", classes.join(' '));
	}

	this.rmClass = function(c) {
		classes.splice(classes.indexOf(c), 1);
		that.attr("class", classes.join(' '));
	}

	this.attr = function(a, v) {
		if(v) e.setAttribute(a, v);
		else return e.getAttribute(a);
	}

	this.select = function(tag) {
		return Wrapper.select(tag, element);
	}

	this.selectAll = function(tag) {
		return Wrapper.selectAll(tag, element);
	}

	var classes = (this.attr('class') || '').split(' ');
}

Wrapper.create = function(tag) {
	return new Wrapper(document.createElement(tag));
}

Wrapper.select = function(sel, elem) {
	var e = (elem || document).querySelector(sel);
	if(e) return new Wrapper(e);
	else return null;
}

Wrapper.selectAll = function(sel, elem) {
	var es = (elem || document).querySelectorAll(sel), ws = []

	for(var i = 0; i < es.length; i++) {
		ws.push(new Wrapper(es[i]));
	}
	
	return ws;
}















