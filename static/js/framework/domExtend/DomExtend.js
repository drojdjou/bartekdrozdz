var DomExtend = (function() {

	// 1. CSS Selecting mechanism (querySelector etc..)
	// 2. Manage state & data (data, classes, display hide/show, clear, add/remove children ect..)
	// State(ext,)

	// 1. Read/write CSS transform (x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ)
	// 2. Read-only dimensions with getBoundingClientRect (x, y, width, height)
	// 3. Write-only CSS width/height 
	// Transform(ext);

	// 1. Support for CSS animation
	// Animation(ext, e;ement);

	var extend = function() {
		var that = this;
		console.log("Extend call", this);

		this.element = function() {
			return that;
		}
	}

	Element.prototype.ext = extend;
	Element.prototype.ext();

})();