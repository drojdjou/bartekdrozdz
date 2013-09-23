FJ.FrameImpulse = (function() {

    window.requestAnimFrame = window.requestAnimFrame || (function() {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var dispatcher = new FJ.EventDispatcher();

    var event = {};
    event.frameNum = 0;

    var loop = function() {
        requestAnimFrame(loop);
        event.frameNum++;
        dispatcher.dispatch(event);
    }

    loop();

    return dispatcher;
    
}());