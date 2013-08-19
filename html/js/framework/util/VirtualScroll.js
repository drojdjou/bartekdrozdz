FJ.VirtualScroll = function (name, easing) {

    var multiplier = 1;

    if (Browsers.chrome()) multiplier = 2;
    if (Browsers.ie()) multiplier = 4;
    if (FJ.Capabilities.touch) multiplier = 2;

    var that = this;

    this.event = {

        scrollX: 0,
        scrollY: 0,

        targetScrollX: 0,
        targetScrollY: 0,

        deltaX: 0,
        deltaY: 0,

        maxDeltaX: 0,
        maxDeltaY: 0

    }

    var lastPageX = 0;
    var lastPageY = 0;
    var attached = false;
    var autoPilotMode = false, startX, startY, targetX, targetY, duration, t;

    this.dispatcher = new FJ.EventDispatcher(function (nl) {

        if (nl > 0 && !attached) {
            attach();
            attached = true;
        } else if (nl == 0 && attached) {
            detach();
            attached = false;
        }

    });

    var minX = null, maxX = null;
    var minY = null, maxY = null;

    this.limitX = function (min, max) {
        minX = min;
        maxX = max;
    }

    this.limitY = function (min, max) {
        minY = min;
        maxY = max;
    }

    this.reset = function () {
        that.setValue(0, 0);
    }

    this.setValue = function (x, y) {
        that.event.scrollX = x;
        that.event.scrollY = y;

        that.event.targetScrollX = x;
        that.event.targetScrollY = y;

        autoPilotMode = false;
    }

    this.scrollTo = function (x, y, d) {
        autoPilotMode = true;

        startX = that.event.scrollX;
        startY = that.event.scrollY;

        that.event.targetScrollX = x;
        that.event.targetScrollY = y;

        // 30 frames = roughyl 0.5s by default (but it could be estimated based on distance-to-travel)
        duration = d || 30;
        t = 0;
    }

    var autoScroll = function () {
        t++;
        var dx = FJ.MathUtil.easeQuadOut(startX, that.event.targetScrollX, t / duration);
        var dy = FJ.MathUtil.easeQuadOut(startY, that.event.targetScrollY, t / duration);
        _set(dx - that.event.scrollX, dy - that.event.scrollY);
        if (t >= duration) {
            autoPilotMode = false;
        }
    }

    var _set = function (dx, dy) {
        if (easing && !autoPilotMode) {
            that.event.targetScrollX += dx;
            that.event.targetScrollY += dy;
        } else {
            that.event.scrollX += dx;
            that.event.scrollY += dy;
        }

        that.event.maxDeltaX = Math.max(that.event.maxDeltaX, Math.abs(dx));
        that.event.maxDeltaY = Math.max(that.event.maxDeltaY, Math.abs(dy));

        that.event.deltaX = dx;
        that.event.deltaY = dy;
    }

    // window.addWheelListener might wrap the callback function into another one, so keep a reference to it for removing the listener later...
    var onWheelCallback;

    this.touch = function () {
        _dispatch();
    }

    var _dispatch = function () {

        if (minX != null) {
            that.event.scrollX = FJ.MathUtil.clamp(minX, maxX, that.event.scrollX);
            that.event.targetScrollX = FJ.MathUtil.clamp(minX, maxX, that.event.targetScrollX);
        }

        if (minY != null) {
            that.event.scrollY = FJ.MathUtil.clamp(minY, maxY, that.event.scrollY);
            that.event.targetScrollY = FJ.MathUtil.clamp(minY, maxY, that.event.targetScrollY);
        }


        that.dispatcher.dispatch(that.event);
    }

    var attach = function () {
        if (FJ.Capabilities.touch) {
            document.addEventListener('touchstart', onTouchStart, false);
            document.addEventListener('touchmove', onTouchMove, false);
        } else {
            onWheelCallback = addWheelListener(document, onWheel, false);
        }

        FJ.FrameImpulse.addEventListener(onFrame);
    }

    var detach = function () {
        removeWheelListener(document, onWheelCallback);
        document.removeEventListener('touchstart', onTouchStart);
        document.removeEventListener('touchmove', onTouchMove);
    }

    var onFrame = function () {
        if (autoPilotMode) {
            autoScroll();
        } else if (easing) {
            that.event.scrollX += (that.event.targetScrollX - that.event.scrollX) * easing;
            that.event.scrollY += (that.event.targetScrollY - that.event.scrollY) * easing;
        }
        _dispatch();
    }

    var onWheel = function (e) {
        autoPilotMode = false;
        var deltaY = (e.deltaY == e.deltaY >> 0) ? e.deltaY : e.deltaY * e.deltaY * e.deltaY,
            deltaX = (e.deltaX == e.deltaX >> 0) ? e.deltaX : e.deltaX * e.deltaX * e.deltaX;

        _set(deltaX * multiplier, deltaY * multiplier);
    }

    var onTouchStart = function (e) {
        lastPageX = 0;
        lastPageY = 0;
    }

    var onTouchMove = function (e) {
        e.preventDefault();

        autoPilotMode = false;

        if (lastPageX != 0) {
            _set(
                -(e.targetTouches[0].pageX - lastPageX) * multiplier,
                -(e.targetTouches[0].pageY - lastPageY) * multiplier
            );
        }

        lastPageX = e.targetTouches[0].pageX;
        lastPageY = e.targetTouches[0].pageY;
    }
};