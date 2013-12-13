window.Simplrz = (function() {

	var s ={}, classes = [];

	var check = function(feature, test) {
		var result = test();
		s[feature] = (result) ? true : false;
		classes.push( (result) ? feature : "no-" + feature );

		document.documentElement.setAttribute("class", classes.join(" "));
	}

	s.pixelRatio = window.devicePixelRatio || 1;

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

	s["prefix"] = prefix;
	classes.push(prefix.lowercase);

	/**
	 *	Note on detecting some CSS features:
	 *
	 *	After reading this (https://github.com/zamiang/detect-css3-3d-transform)
	 *	I realized detecting css3d transforms is unreliable. But also - we don't really need it
	 *	because typically the only browser we need to support that doesn't do css 3d transforms
	 *	is IE9 and IE8 so why not do some good old browser sniffing. Then, I found the snippet below.
	 *
	 *	(as a reminder: IE9 - only 2d transforms, no transrion, no animarions, IE8 - not even 2d)
	 */

	var ie = (function(){
	    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
	    while (
	        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
	        all[0]
	    );
	    return v > 4 ? v : null;
	})();


	s["ie"] = ie || false;
	classes.push((ie) ? "ie-" + ie : "no-ie");

	check("css3d", function() {
		var div = document.createElement("div");
		div.style[this.prefix + "Transform"] = '';
		div.style[this.prefix + "Transform"] = 'rotateY(90deg)';
		return div.style[this.prefix + "Transform"] !== '';
	});

	check("csstransitions", function() { return !ie || ie >= 10; });

	check("cssanimations", function() { return !ie || ie >= 10; });

	check("css2d", function() { return !ie || ie >= 9; });

	check("touch", function() {
		return 'ontouchstart' in document;
	});

	check("pointer", function() {
		return (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1);
	});

	check("canvas", function() {
		try { 
			var canvas = document.createElement('canvas'); 
			return canvas.getContext('2d');
		} catch(e) { 
			return false; 
		}
	});

	check("history", function() {
		return !!(window.history && history.pushState);
	});


	check("webrct", function() {
		return ('getUserMedia' in navigator || 'webkitGetUserMedia' in navigator);
	});

	check("webgl", function() {
		try { 
			var canvas = document.createElement('canvas'); 
			return !!window.WebGLRenderingContext && 
				(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
		} catch(e) { 
			return false; 
		} 
	});

	check("flash", function() {
		return !!(
			navigator.mimeTypes["application/x-shockwave-flash"] || 
			window.ActiveXObject && new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
		);
	});

	return s;

})();