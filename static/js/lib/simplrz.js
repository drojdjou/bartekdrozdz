window.Simplrz = (function() {

	var s ={}, classes = [];

	var check = function(feature, test) {
		var result = test();
		s[feature] = result;
		classes.push( (result) ? feature : "no-" + feature );
	}

	// Source: http://davidwalsh.name/vendor-prefix
	var prefix = (function () {
		var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	})();

	classes.push(prefix.lowercase);

	// Source: modernizr
	check("touch", function() {
		return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	});

	check("webrct", function() {
		return ('getUserMedia' in navigator || 'webkitGetUserMedia' in navigator);
	});

	check("canvas", function() {
		try { 
			var canvas = document.createElement('canvas'); 
			return canvas.getContext('2d');
		} catch(e) { 
			return false; 
		} 
	});

	// Source: Three.js detect script
	check("webgl", function() {
		try { 
			var canvas = document.createElement('canvas'); 
			return !!window.WebGLRenderingContext && 
				(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
		} catch(e) { 
			return false; 
		} 
	});

	// Source: hm... somewhere on SO
	check("flash", function() {
		return !!(
			navigator.mimeTypes["application/x-shockwave-flash"] || 
			window.ActiveXObject && new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
		);
	});

	document.documentElement.setAttribute("class", classes.join(" "));

	return s;

})();