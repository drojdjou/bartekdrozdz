var Box = function(element) {

    var _active = false;

	var ext = element.ext;
	var id = ext.attr("data-id");
    var imageLoaded = false, hoverLockTimer = 0;

    var easer = new Easer(), scrollDirection = 0, touchX = 0;
    easer.setEase(0.1); 

    var rect = element.ext.rect();
    var initY = element.ext.rect().top, offset = 0;

    var container = ext.select(".container");

    if(id) {
    	var data = Data.getProjectById(id);
        var mask = ext.select(".mask");
        var img = ext.select("img");

        var imageLoaded = false;

        mask.ext.css('backgroundColor', data.tint);

        var largeScreen = window.innerWidth > 768;
        var largeFolder = (data.type == "demo") ? "400sq" : "675sq";
        var smallFolder = (data.type == "demo") ? "200sq" : "320sq";
        var imageFolder = (largeScreen) ? largeFolder : smallFolder;
        var imagePath = "assets/content/%f%/%id%.jpg".replace("%f%", imageFolder).replace("%id%", data.id);

        img.ext.on('load', function() {
            // if(Simplrz.touch) {
            //     mask.ext.css('opacity', 0);
            // } else {
                    mask.ext.transition({ 'backgroundColor': 'rgba(0,0,0,0)' }, 500, 'ease', 0, function() {
                    mask.ext.attr('class', 'hover');
                    Util.delay(function() {
                        mask.ext.css('backgroundColor', data.tint);
                        container.classList.add('hovered-transition');
                        releaseHoverLock();
                    });
                });
            // }
        });
    }

    var releaseHoverLock = function() {
        container.classList.add('hovered-container');
    }

    var onScroll = function(e) {
        if(!_active) return;
        easer.updateTarget(e.deltaY);
        scrollDirection = e.deltaY / Math.abs(e.deltaY);

        clearTimeout(hoverLockTimer);
        container.classList.remove('hovered-container');
        hoverLockTimer = setTimeout(releaseHoverLock, 1000);
    }

    var onRender = function() {
        if(!_active) return;

        if(!imageLoaded && img) {
            if((initY + offset) < window.innerHeight) {
        		img.src = imagePath;
                imageLoaded = true;
            }
        }

        // Individual easing only on non-touch screens (for better performance)
        // if(!Simplrz.touch) {
            var ey = Math.clamp01((initY + offset) / window.innerHeight);
            var ex = Math.clamp01(Math.abs( (rect.left + rect.width / 2) - touchX) / window.innerWidth);

            if(scrollDirection < 0) ey = 1 - ey;
            var e = ey * 0.5 + (1 - ex) * 0.5;
            easer.setEase(0.05 + e * 0.12); 
        // }

        offset = easer.easeVal();
        element.ext.transform({ y: offset });       
    }

    var onRoute = function(e) {
        var r = e.parts[0];
        _active = (r == Site.MAIN);

        if(!_active) {
            clearTimeout(hoverLockTimer);
            container.classList.remove('hovered-container');
        }
    };
    
    VirtualScroll.on(onScroll);
    Application.on(MSG.ROUTE, onRoute);
    FrameImpulse.on(onRender);

    document.addEventListener("mousemove", function(e) {
        touchX = e.pageX;
    });

    document.addEventListener("touchmove", function(e) {
        var t = (e.targetTouches) ? e.targetTouches[0] : e;
        touchX = t.pageX;
    });

    element.box = {};
    
    element.box.onResize = function(m) {
        console.log("Box.onResize");
        easer.setLimits(-m, 0);

        rect = element.ext.rect();
        var w = rect.width | 0;
        var h = rect.height | 0;

        container.ext.width(w-5);
        container.ext.height(h-5);
    }    
};











