FJ.CSSAnimationBehavior = function(view, raa, tmp) {

    this.resetAfterAnimation = false;

    if(!tmp) {
        console.log("CSSAnimationBehavior created outside of constructor");
        if(raa) console.warn("### #### #### --- --- resetAfterAnimation = true");
        this.resetAfterAnimation = raa;
        console.trace();
    }

    view.animation = {};

    var a = view.animation;
    var s = view.div.style;

    var vendor = FJ.Capabilities.vendor;

    a.set = function (name, time, ease, delay, callback, fillMode) {

        delay = delay || 0;

        var t = (time + delay) * 1000;

        var ap = name + ' ' + time + 's ' + ease + ' ' + delay + 's';
        s[vendor + 'animation'] = ap;

        if (fillMode) {
            s[vendor + 'animationFillMode'] = fillMode;
        }

        if(callback || this.resetAfterAnimation) {
            setTimeout(function() {
                if(this.resetAfterAnimation) a.reset();
                if(callback) callback();
            }, t);
        }
    };

    a.reset = function() {
        s[vendor + 'animation'] = '';
        //s[vendor + 'animation-fill-mode'] = '';
        s[vendor + 'animationFillMode'] = '';
    }

    return a;
}