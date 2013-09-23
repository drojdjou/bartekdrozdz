/*

 This behavior (optionally) extends an existing object (reverse inheritance) so it will be able to control a dom element.

 To access these methods, use controller.transform.*

 @author josh.beckwith@toolofna.com

 @param element - the DOM element to be affected
 @param controller - object to add this behavior to
 @return - the controller object

 */

FJ.CSSTransformBehavior = function (element, controller) {
    controller = controller || {};
    controller.transform = {};
    var t = controller.transform;

    var cssTransforms = FJ.Capabilities.csstransforms;
    var vendor = FJ.Capabilities.vendor || "";

    var transforms = {
        translateZ: undefined,
        translateX: undefined,
        translateY: undefined,
        skewX: undefined,
        skewY: undefined,
        scaleX: undefined,
        scaleY: undefined,
        rotate: undefined,
        rotateX: undefined,
        rotateY: undefined,
        rotateZ: undefined,
        toString: function () {
            var props = "";
            for (var p in this) {
                if (this[p] != undefined && typeof this[p] !== "function")
                    props += p + "(" + this[p] + ") ";
            }
            return props;
        }
    };

    t.transforms = function () {
        return transforms;
    };

    if (FJ.Capabilities.csstransforms3d) transforms.translateZ = 0;

    var _originX = "50%",
        _originY = "50%";
    FJ.define(t, "origin",
        function () {
            return _origin;
        },
        function (x, y) {
            _originX = x;
            _originY = y;
            element.style[(vendor + "transform-origin")] = _originX + " " + _originY;
        }
    );


    function setTransforms() {
        element.style[(vendor + "transform")] = transforms.toString();
    }

    if (cssTransforms) {

        t.translate = function (x, y, z) {
            transforms.translateX = x + "px";
            transforms.translateY = y + "px";
            transforms.translateZ = z + "px";
            setTransforms();
        };

        FJ.define(t, "x",
            function () {
                transforms.translateX = transforms.translateX || "0";
                return parseFloat(transforms.translateX.split("px")[0]);
            },
            function (x) {
                transforms.translateX = x + "px";
                setTransforms();
            });

        FJ.define(t, "y",
            function () {
                transforms.translateY = transforms.translateY || "0";
                return parseFloat(transforms.translateY.split("px")[0]);
            },
            function (y) {
                transforms.translateY = y + "px";
                setTransforms();
            }
        );

        FJ.define(t, "z",
            function () {
                transforms.translateZ = transforms.translateZ || "0";
                return parseFloat(transforms.translateZ.split("px")[0]);
            },
            function (z) {
                transforms.translateZ = z + "px";
                setTransforms();
            }
        );

    } else {

        t.translate = function (x, y) {
            element.style.left = x + "px";
            element.style.top = y + "px";
        };

        FJ.define(t, "x",
            function () {
                return parseFloat(element.style.left.split("px")[0]);
            },
            function (x) {
                element.style.left = x + "px";
            }
        );

        FJ.define(t, "y",
            function () {
                return parseFloat(element.style.top.split("px")[0]);
            },
            function (y) {
                element.style.top = y + "px";
            }
        );

    }

    FJ.define(t, "rotate",
        function () {
            transforms.rotate = transforms.rotate || "0";
            var matchUnitRegex = /([a-z].*)/g;
            var unit = matchUnitRegex.exec(transforms.rotate)[0];
            return parseFloat(transforms.rotate.split(unit)[0]);
        },
        function (val, unit) {
            unit = unit || "deg";

            transforms.rotate = val + unit;
            setTransforms();
        }
    );

    t.scale = function (sx, sy) {
        transforms.scaleX = sx;
        transforms.scaleY = sy;
        setTransforms();
    };

    FJ.define(t, "scaleX",
        function () {
            transforms.scaleX = transforms.scaleX || "1";
            return parseFloat(transforms.scaleX);
        },
        function (sx) {
            transforms.scaleX = sx;
            setTransforms();
        }
    );

    FJ.define(t, "scaleY",
        function () {
            transforms.scaleY = transforms.scaleY || "1";
            return parseFloat(transforms.scaleY);
        },
        function (sy) {
            transforms.scaleY = sy;
            setTransforms();
        }
    );

    t.skew = function (x, y, unit) {
        unit = unit || "deg";
        transforms.skewX = x + unit;
        transforms.skewY = y + unit;
        setTransforms();
    };

    t.rotate3D = function (x, y, z, unit) {
        unit = unit || "deg";
        transforms.rotateX = x + unit;
        transforms.rotateY = y + unit;
        transforms.rotateZ = z + unit;
        setTransforms();
    };

    FJ.define(t, "skewX",
        function () {
            var unit = getRotationUnit(transforms.skewX);
            return parseFloat(transforms.skewX.split(unit)[0]);
        },
        function (sx, unit) {
            unit = unit || "deg";
            transforms.skewX = sx + unit;
            setTransforms();
        });

    FJ.define(t, "skewY",
        function () {
            var unit = getRotationUnit(transforms.skewY);
            return parseFloat(transforms.skewY.split(unit)[0]);
        },
        function (sy) {
            var unit = unit || "deg";
            transforms.skewY = sy + unit;
            setTransforms();
        }
    );

    function getRotationUnit(string) {
        var matchUnitRegex = /([a-z].*)/g;
        return matchUnitRegex.exec(string)[0];
    }

    return controller;
};
