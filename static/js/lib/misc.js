Math.clamp = function(v, s, e) {
	return Math.max(Math.min(v, e), s);
}

// Rect = top/left/right/bottom - basically Wrapper.rect()
// Point = x/y
Math.pointInRect = function(p, r) {
	return (p.x >= r.left && p.x <= r.right) && (p.y >= r.top && p.y <= r.bottom);
}

CSSUtil = {
	hexToRgb: function(hex) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}
}
