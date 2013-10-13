window.Simplrz = (function() {

	var s ={}, classes = [];

	var check = function(feature, test) {
		var result = test();
		s[feature] = result;
		classes.push( (result) ? feature : "no-" + feature );
	}

	check("touch", function() {
		return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	});

	check("webgl", function() {
		try { 
			var canvas = document.createElement( 'canvas' ); 
			return !!window.WebGLRenderingContext && 
				(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
		} catch(e) { 
			return false; 
		} 
	});

	document.documentElement.setAttribute("class", classes.join(" "));

	return s;

})();