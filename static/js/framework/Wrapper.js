window.Wrapper = function(e) {

	var hw = true;
	var element = e;

	var px = 0, py = 0, pz = 0;
	var sx = 1, sy = 1;

	var applyTransform = function() {
		element.style.webkitTransform = "translate3d(" + px + "px," + py + "px," + pz + "px) scale(" + sx + "," + sy + ")";
		element.style.transform = "translate3d(" + px + "px," + py + "px," + pz + "px) scale(" + sx + "," + sy + ")";
	}

	this.move = function(x, y, z) {
		px = x || 0;
		py = y || 0;
		pz = z || 0;
		applyTransform();
	}

	this.scale = function(x, y) {
		sx = x || 1;
		sy = y || 1;
		applyTransform();
	}

	this.moveBy = function(x, y, z) {
		px += x || 0;
		py += y || 0;
		pz += z || 0;
		applyTransform();
	}

	this.height = function() {
		// return element.offsetHeight;
		return element.scrollHeight;
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

	this.domElement = function() {
		return element;
	}

	this.on = function(m, f) {
		element.addEventListener(m, f);
	}

	this.off = function(m, f) {
		element.removeEventListener(m, f);
	}
}

Wrapper.create = function(tag) {
	return new Wrapper(document.createElement(tag));
}

Wrapper.select = function(sel) {
	var e = document.querySelector(sel);
	if(e) return new Wrapper(e);
	else return null;
}

Wrapper.selectAll = function(sel) {
	var es = document.querySelectorAll(sel), ws = []

	for(var i = 0; i < es.length; i++) {
		ws.push(new Wrapper(es[i]));
	}
	
	return ws;
}















