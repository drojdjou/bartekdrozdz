State = function(ext, element) {

	var cc = function(p) {
		return p.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
	}

	ext.data = {};

	ext.show = function(display) {
		element.style.display = display || "block";
	};

	ext.hide = function() {
		element.style.display = "none";
	};

	ext.visible = function() {
		return ext.readCss('display') != "none";
	};

	ext.on = function(event, callback, useCapture) {
		return element.addEventListener(event, callback, useCapture);
	};

	ext.off = function(event, callback, useCapture) {
		return element.removeEventListener(event, callback, useCapture);
	};

	ext.css = function(property, value) {
		if(typeof property == "string") {
			element.style[cc(property)] = value;
		} else {
		// assume property arg is object
			for(var p in property){
				element.style[cc(property)] = property[p];
			}
		}
	};

	ext.readCss = function(property, notCalculated) {
		return (notCalculated) ? element.style[property] : getComputedStyle(element).getPropertyValue(property);
	}

	ext.attr = function(name, value) {
		if(value != undefined) {
			element.setAttribute(name, value);
		}
		return element.getAttribute(name);
	}
};