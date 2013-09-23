FJ.ElementWrapper = function (element) {

    var _that = this;

    var vendor = FJ.Capabilities.vendor;
    var vendorNodash = FJ.Capabilities.vendorNodash;

    if (element) _that.div = element;
    else _that.div = document.createElement('div');

    FJ.define(this, "id",
        function () {
            return _that.div.id
        },
        function (id) {
            _that.div.id = id;
        }
    );

    FJ.define(this, "class",
        function () {
            return _that.div.className
        },
        function (name) {
            _that.div.className = name;
        }
    );

    this.translate = function (x, y, z, otherTransforms) {
        x = x || 0;
        y = y || 0;
        z = z || 0;
        otherTransforms = otherTransforms || '';

        var st = (vendorNodash == '') ? 'transform' : vendorNodash + 'Transform';

        if (FJ.Capabilities.csstransform3d) {
            var t = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) ' + otherTransforms;
            _that.div.style[st] = t;
        } else {
            _that.div.style[st] = 'translate(' + x + 'px, ' + y + 'px)';
        }
    }

    this.setDisplay = function (d) {
        _that.div.style.display = d;
    }

    this.opacity = function (o) {
        _that.div.style.opacity = o;
    }

    this.registerClick = function (f) {
        _that.div.addEventListener('click', f);
    };

    this.unRegisterClick = function (f) {
        _that.div.addEventListener('click', f);
    };

    this.width = function () {
        return _that.div.offsetWidth;
    };
    this.height = function () {
        return _that.div.offsetHeight;
    };

    this.mouseEnabled = function (v) {
        _that.div.style['pointer-events'] = (v) ? 'auto' : 'none';
    }

    // implementing css transform and transition methods
    new FJ.CSSTransformBehavior(this.div, this);
    new FJ.CSSTransitionBehavior(this.div, this);
    new FJ.CSSAnimationBehavior(this, false, true);

}