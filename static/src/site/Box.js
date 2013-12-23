var Box = function(element) {

    var _active = false;

	var ext = element.ext;
	var id = ext.attr("data-id");
    var imageLoaded = false, hoverLocked = true;

    var easer = new Easer(), scrollDirection = 0;
    easer.setEase(0.5); 

    var rect = element.ext.rect();
    var initY = element.ext.rect().top, offset = 0;

    var container = ext.select(".container");

    if(id) {
    	var data = Data.getProjectById(id);
        var mask = ext.select(".mask");
        var img = ext.select("img");

        var imageLoaded = false;

        mask.ext.css('backgroundColor', data.tint);

        // Always load big images for non-touch devices (ex. when user has browser window very small on desktop)
        var largeScreen = window.innerWidth > 768 || (!Simplrz.touch);
        var largeFolder = (data.type == "demo") ? "400sq" : "675sq";
        var smallFolder = (data.type == "demo") ? "200sq" : "320sq";
        var imageFolder = (largeScreen) ? largeFolder : smallFolder;
        var imagePath = Site.CDN + "assets/content/%f%/%id%.jpg".replace("%f%", imageFolder).replace("%id%", data.id);

        img.ext.on('load', function() {
            mask.ext.transition({ 'backgroundColor': 'rgba(0,0,0,0)' }, 500, 'ease', 0, function() {
                mask.ext.attr('class', 'hover');
                Util.delay(function() {
                    mask.ext.css('backgroundColor', data.tint);
                    if(!Simplrz.touch) container.classList.add('hovered-transition');
                    imageLoaded = true;
                });
            });
        });
    }

    var applyHoverLock = function() {
        if(Simplrz.touch) return;
        container.classList.remove('hovered-container');
        hoverLocked = true;
    }

    var releaseHoverLock = function() {
        if(Simplrz.touch) return;
        container.classList.add('hovered-container');
        hoverLocked = false;
    }

    var onScroll = function(e) {
        if(!_active) return;
        easer.updateTarget(e.deltaY);
        scrollDirection = e.deltaY / Math.abs(e.deltaY);
        if(!hoverLocked) applyHoverLock();
    }

    var onRender = function() {
        if(!_active) return;

        if(!imageLoaded && img) {
            if((initY + offset) < window.innerHeight) {
        		img.src = imagePath;
            }
        }

        if(easer.velocity < 0.1 && hoverLocked && imageLoaded) releaseHoverLock();

        var ey = Math.clamp01((initY + offset) / window.innerHeight);
        var ex = Math.clamp01(Math.abs( (rect.left + rect.width / 2) - Pointer.x) / window.innerWidth);

        if(scrollDirection < 0) ey = 1 - ey;
        var e = ey * 0.5 + (1 - ex) * 0.5;
        easer.setEase(0.05 + e * 0.12); 

        offset = easer.easeVal();
        element.ext.transform({ y: offset });       
    }

    var onRoute = function(e) {
        var r = e.parts[0];
        _active = (r == Site.MAIN);

        if(!_active) applyHoverLock();
    };
    
    VirtualScroll.on(onScroll);
    Application.on(MSG.ROUTE, onRoute);
    FrameImpulse.on(onRender);

    element.box = {};

    element.box.onAutoScroll = function(t) {
        easer.setTarget(t);
    }
    
    element.box.onResize = function(m) {
        easer.setLimits(-m, 0);

        rect = element.ext.rect();
        var w = rect.width | 0;
        var h = rect.height | 0;

        container.ext.width(w-5);
        container.ext.height(h-5);
    }    
};











