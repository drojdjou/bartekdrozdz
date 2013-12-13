State = function(ext, element) {

	ext.data = {};

	ext.show = function(display) {
		element.style.display = display || "block";
	};

	ext.hide = function() {
		element.style.display = "none";
	};

	ext.visible = function() {
		return element.style.display != "none";
	};

	ext.on = function(event, callback, useCapture) {
		return element.addEventListener(event, callback, useCapture);
	};

	ext.off = function(event, callback, useCapture) {
		return element.removeEventListener(event, callback, useCapture);
	};

	ext.css = function(property, value) {
		if(typeof property == "string"){
			if(value !== null) element.style[property] = value;
			return element.style[property];
		}else{
			// assume property arg is object
			for(var p in property){
				element.style[p] = property[p];
			}
		}
	};

	ext.attr = function(attrName, attrVal){
		if(attrVal != undefined)
			element.setAttribute(attrName, attrVal);
		return element.getAttribute(attrName);
	}
};