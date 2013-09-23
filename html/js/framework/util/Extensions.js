// Code from https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/wheel
// Creates a global "addwheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
(function(window, document) {

    var prefix = "", _addEventListener, _removeEventListener, support;

    if (window.addEventListener) {
        _addEventListener = "addEventListener";
        _removeEventListener = "removeEventListener";
    } else {
        _addEventListener = "attachEvent";
        _removeEventListener = "detachEvent";
        prefix = "on";
    }


    if (document.onmousewheel !== undefined) {
        support = "mousewheel"
    }

    try {
        WheelEvent("wheel");
        support = "wheel";
    } catch (e) {
    }

    if (!support) {
        support = "DOMMouseScroll";
    }

    window.addWheelListener = function(elem, callback, useCapture) {
        var func = support == "wheel" ? callback : callbackProxy(callback);
        elem[ _addEventListener ](prefix + support, func, useCapture || false);
        if (support == "DOMMouseScroll") elem[ _addEventListener ]("MozMousePixelScroll", func, useCapture || false);
        return func;
    };

    window.removeWheelListener = function(elem, callback) {
        elem[ _removeEventListener ](prefix + support, callback);
        if (support == "DOMMouseScroll") elem[ _removeEventListener ]("MozMousePixelScroll", callback);
    }

    var callbackProxy = function(callback) {
        return function(originalEvent) {
            !originalEvent && ( originalEvent = window.event );

            var event = {
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaY: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };

            if (support == "mousewheel") {
                event.deltaY = - originalEvent.wheelDelta / 10;
                originalEvent.wheelDeltaX && ( event.deltaX = - originalEvent.wheelDeltaX / 10 );
            } else {
                event.deltaY = originalEvent.detail;
            }

            event.deltaX = event.deltaX | 0;
            event.deltaY = event.deltaY | 0;

            return callback(event);
        }
    }


})
(window,document);


(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


// fix for IE 8 indexOf bug
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    }
}

// ie console log bug prevention ( > 9?)
if (!(window.console && console.log)) {
    (function () {
        var noop = function () {
        };
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

