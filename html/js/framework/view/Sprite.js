FJ.View = function(container, tag) {
    "use strict";

    var _that = this;

    var _container = container;// || document.body;

    this.div = document.createElement(tag || 'div');
    this.visible = false;

    FJ.ElementWrapper.call(this);

    this.show = function() {
        if (!_that.visible) _container.appendChild(_that.div);
        _that.visible = true;
    };

    this.hide = function() {
        if (_that.visible) _container.removeChild(_that.div);
        _that.visible = false;
    };

    this.add = function() {
        for (var i = 0; i < arguments.length; i++) {
            var d = arguments[i];
            d.visible = true;
            if (!this.contains(d)) this.div.appendChild(d.div);
        }
    }

    this.contains = function(d) {
        return d.div.parentNode == this.div;
    }

    this.remove = function() {
        for (var i = 0; i < arguments.length; i++) {
            var d = arguments[i];
            d.visible = false;
            if (this.contains(d)) this.div.removeChild(d.div);
        }
    }

    this.removeAll = function() {
        this.div.innerHTML = '';
    }
};

FJ.View.prototype = new FJ.ElementWrapper();
FJ.View.prototype.constructor = FJ.ElementWrapper;
