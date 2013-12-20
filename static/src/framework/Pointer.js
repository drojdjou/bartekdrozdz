Pointer = (function() {

	var p = {
		x: 0, y: 0
	}

	if(Simplrz.touch) {
		document.addEventListener("touchmove", function(e) {
        	var t = (e.targetTouches) ? e.targetTouches[0] : e;
	        p.x = t.pageX;
	        p.y = t.pageY;
	    });
	} else {
		document.addEventListener("mousemove", function(e) {
	        p.x = e.pageX;
	        p.y = e.pageY;
	    });
	}

    return p;

})();