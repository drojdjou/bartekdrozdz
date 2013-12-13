var Box = function(element) {

    var _active = false;

	var ext = element.ext;
	var id = ext.attr("data-id");
    var imageLoaded = false, hoverLockTimer = 0;
    var easer = new Easer(), scrollDirection = 0, touchX = 0;
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

            mask.ext.transition({ 'background-color': 'rgba(0,0,0,0)' }, 500, 'ease');

            Util.delay(function() {
                mask.ext.css('backgroundColor', data.tint);
            	mask.ext.attr('class', 'hover');
                releaseHoverLock();
            }, 250);
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

    var c = 0;

    var onRender = function() {
        

        if(!imageLoaded && img) {
            var bb = element.ext.rect();
            if(bb.top < window.innerHeight) {
        		img.src = imagePath;
                imageLoaded = true;
            }
        }

        if(!_active) return;

        // On touch screens scroll the whole panel (for better performance) (see Main.onRender)
        if(!Simplrz.touch) {
            var bb = element.ext.rect();
            var ey = Math.clamp01(bb.top / window.innerHeight);
            var ex = Math.clamp01(Math.abs( (bb.left + bb.width / 2) - touchX) / window.innerWidth);

            if(scrollDirection < 0) ey = 1 - ey;

            var e = ey * 0.5 + (1 - ex) * 0.5;

            easer.setEase(0.05 + e * 0.12); 

            var v = easer.easeVal();
            element.ext.transform({ y: v }); 
        }       
    }

    var onRoute = function(e) {
        var r = e.parts[0];
        _active = (r == Site.MAIN);

        if(!_active) {
            container.classList.remove('hovered-container');
        } else {
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
        easer.setLimits(-m, 0);

        // var bb = element.ext.rect();

        // var w = bb.width() | 0;
        // var h = bb.height() | 0;

        // container.ext.width(w);
        // container.ext.height(h);
    }    
};











