Math.clamp = function(v, s, e) {
	return Math.max(Math.min(v, e), s);
}

// Rect = top/left/right/bottom - basically Wrapper.rect()
// Point = x/y
Math.pointInRect = function(p, r) {
	return (p.x >= r.left && p.x <= r.right) && (p.y >= r.top && p.y <= r.bottom);
}
