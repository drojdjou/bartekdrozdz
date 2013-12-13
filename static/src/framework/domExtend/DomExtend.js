var DomExtend = (function() {

	var that = {};

	that.create = function(tag) {
		var e = document.createElement(tag);
		that.extend(e);
		return e;
	};

	that.select = function(sel, element) {
		var e = (element || document).querySelector(sel);
		if(e && !e.ext) that.extend(e);
		return e;
	};

	that.selectAll = function(sel, element) {
		var es = (element || document).querySelectorAll(sel);
		var nes = es.length, r = [];
		for(var i = 0; i < nes; i++) {
			var e = es[i]
			if(!e.ext) e = that.extend(e);
			r.push(e);
		}
		return r;
	};

	that.extend = function(element) {

		if(element.ext) return;

		var ext = {};

		ext.create = function(tag) {
			return that.create(tag);
		};

		ext.select = function(sel) {
			return that.select(sel, element);
		};

		ext.selectAll = function(sel) {
			return that.selectAll(sel, element);
		};

		// Add State related functions (see State.js for details)
		if(window.State) State(ext, element);

		// Add Transform related functions (see Transform.js for details)
		if(window.Transform) Transform(ext, element);

		// Add Transition related functions (see Transition.js for details)
		if(window.Transition) Transition(ext, element); 

		ext.element = element;
		element.ext = ext;
		return element;
	};

	that.extend(document);
	window.EXT = that;

	return that;

})();