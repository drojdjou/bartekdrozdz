/*

 FJ.Capabilities extends Modernizr.

 */


FJ.Capabilities = (function () {

	var c = {};

	if (Modernizr == undefined) throw Error("Modernizr is required");
//    for (var p in Modernizr) c[p] = Modernizr[p];

	c = Modernizr;

	var _vendor = "";
    var _vendorNodash = "";
	var prefixes = ["webkit", "moz", "ms"];
	var pfx = Modernizr.prefixed("transform").toLowerCase();
	for (var i = 0; i < prefixes.length; i++) {
		if (pfx.split("transform")[0] == prefixes[i]) {
            _vendor = "-" + prefixes[i] + "-";
            _vendorNodash = prefixes[i];
            if(_vendorNodash == "moz") _vendorNodash = "Moz";
        }
	}

	c.vendor = _vendor;
	c.vendorNodash = _vendorNodash;

    // TODO: Make this more reliable
    c.isMobile = c.touch;

	return c;

})();
