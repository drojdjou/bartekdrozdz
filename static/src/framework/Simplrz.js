window.Simplrz = (function() {

	var s = {}, classes = ['js']; // Add 'js' class by default (bc if this code runs, JS is enabled, right?)

	var check = function(feature, test) {
		var result = test();
		s[feature] = (result) ? true : false;
		classes.push( (result) ? feature : "no-" + feature );

		document.documentElement.setAttribute("class", classes.join(" "));
	}

	s.pixelRatio = window.devicePixelRatio || 1;

	var prefix = (function () {

		var styles = "", pre = "", dom = "";

		if(window.getComputedStyle) {
			styles = window.getComputedStyle(document.documentElement, '');
			pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		}

		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: (pre == "") ? "" : pre[0].toUpperCase() + pre.substr(1)
		};
	})();

	s["prefix"] = prefix;
	classes.push(prefix.lowercase);

	s.prefixedProp = function(prop) {
		switch(prefix.lowercase) {
			case "webkit": return "webkit" + prop.charAt(0).toUpperCase() + prop.slice(1);
			case "ms": return "-ms-" + prop;
			case "moz": return "Moz" + prop.charAt(0).toUpperCase() + prop.slice(1);
			default: return prefix.css + prop;
		}
	} 

	/**
	 *	Note on detecting some CSS features:
	 *
	 *	After reading this (https://github.com/zamiang/detect-css3-3d-transform)
	 *	I realized detecting css3d transforms is unreliable. But also - we don't really need it
	 *	because typically the only browser we need to support that doesn't do css 3d transforms
	 *	is IE9 and IE8 so why not do some good old browser sniffing?
	 *
	 *	(as a reminder: IE9 - only 2d transforms, no transrion, no animarions, IE8 - not even 2d)
	 */

	var ie = (function(){
	    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
	    while (
	        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
	        all[0]
	    ) {
	    	// console.log(div.innerHTML);
	    }
	    return v > 4 ? v : null;
	})();

	// IE 10 doesn't use conditional comments anymore
	if(ie == null) {
		var p = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		var ua = navigator.userAgent;
		var m = ua.match(p);
		ie = (m && m.length > 1) ? parseInt(m[1]) : null;
	}


	// These properties are for browser specific hack (yes, they are sometimes necessary)
	s.ie = ie || false;
	classes.push((ie) ? "ie-" + ie : "no-ie");

	s.firefox = prefix.lowercase == "moz";
	classes.push(s.firefox ? "firefox" : "no-firefox");

	s.safariDesktop = navigator.userAgent.match(/Safari/) && !navigator.userAgent.match(/Chrome/) && !('ontouchstart' in document);
	classes.push(s.safariDesktop ? "safari-desktop" : "no-safari-desktop");

	s.ipad7 = navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) || false;
	classes.push(s.ipad7 ? "ipad7" : "no-ipad7");

	check("css3d", function() {

		if(prefix.lowercase == 'webkit' || prefix.lowercase == 'moz') return true;

		if(prefix.lowercase == 'ms') {
			var div = document.createElement("div");
			div.style[prefix.css + "transform"] = 'translateZ(0px)';
			var cs = getComputedStyle(div);
			var a = cs.getPropertyValue(prefix.css + "transform");
			return a && a != '' && a != 'none';
		}

		return false;
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


	check("webrtc", function() {
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

	// Flash is dead anyway!
	// check("flash", function() {
	// 	return !!(
	// 		navigator.mimeTypes["application/x-shockwave-flash"] || 
	// 		window.ActiveXObject && new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
	// 	);
	// });

	s.classes = classes;

	return s;

})();