/*
 This behavior (optionally) extends an existing object (reverse inheritance) so it will be able to control a dom element.

 To access these methods, use controller.transition.*

 @author josh.beckwith@toolofna.com

 @param element - the DOM element to be affected
 @param controller - object used to make calls
 @param opt_vendor - optional vendor prefix. Defaults to FJ.Capabilities.vendor if it exists, else uses no prefix

 @return - the controller object

 */

FJ.CSSTransitionBehavior = function (element, controller, opt_vendor) {
	controller = controller || {};
	var t = controller.transition = {},
		vendor = "",
		properties = {};

	// set the vendor prefix
	if (opt_vendor != undefined) {
		vendor = ("-" + opt_vendor + "-");
	} else if (FJ.Capabilities.vendor != undefined) {
		vendor = FJ.Capabilities.vendor;
	}

	function applyParams() {

		var strings = [];
		for (var p in properties) {
			var string = "";
			string += p + " ";
			string += properties[p].duration + "ms ";
			string += properties[p].delay + "ms ";
			string += properties[p].ease;
			strings.push(string)
		}

		element.style[(vendor + "transition")] = strings.join(",");
	}

	/*

	 @param name - name of the css property to affect.
	 @param duration - length of animation in milliseconds
	 @param delay - animation delay in milliseconds
	 @param easeFunc - name of function to be used for easing. Use FJ.ANIM constants, or FJ.ANIM.cubicBezier

	 */
	t.set = function (name, duration, delay, easeFunc, callBack) {
        var d1 = duration || 300;
        var d2 = delay || 0;
		properties[name] = {};
		properties[name].duration = d1;
		properties[name].delay = d2;
		properties[name].ease = easeFunc || FJ.ANIM.EASE;
		applyParams();
        if(callBack)setTimeout(function(){callBack();},d1+d2);
	};

	/*

		Same as set(), but prefixes name arg with vendor prefix.
		Useful for setting transitions for transforms

	*/

	t.setPrefixed = function(name, duration, delay, easeFunc){
		t.set(vendor + name, duration, delay, easeFunc);
	};


	FJ.define(t, "properties",
		function () {
			return properties;
		}
	);

	return controller;
};


FJ.ANIM = {};
var cb = "cubic-bezier(";

/*

 @params - can be 0-1. some browsers support out-of-range y values
 @see http://www.roblaplaca.com/examples/bezierBuilder/

 */
FJ.ANIM.cubicBezier = function (n1, n2, n3, n4) {
	return cb + n1 + ", " + n2 + ", " + n3 + ", " + n4 + ")";
};


FJ.ANIM.EASE_IN_OUT = "ease-in-out";
FJ.ANIM.EASE_OUT = "ease-out";
FJ.ANIM.EASE_IN = "ease-in";
FJ.ANIM.EASE = "ease";
FJ.ANIM.LINEAR = "linear";


//TODO - add presets for cubic bezier animations
// cubic bezier presets
FJ.ANIM.BACK_IN = cb + "1, -1, .25, 1.25)";
FJ.ANIM.BACK_OUT = cb + ".75, -0.25, 0, 2)";

FJ.ANIM.STUTTER_IN = cb + "0, .29, 1, -0.36)";