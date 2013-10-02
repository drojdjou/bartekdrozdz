var ContentPanel = function() {

	var active = false;
	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var content = 	Wrapper.select('#content');
	var close = 	Wrapper.select('#content .close');

	var header = Wrapper.select('#content h2');
	var text = Wrapper.select('#content .content');
	var iframe = Wrapper.select('#content .demo-frame');

	var onResize = function() {
		scrollMax = text.position().y - (window.innerHeight - text.height());
	}

	var onScroll = function(e) {
		if(!active) return;
		scrollTarget += e.deltaY;
	}

	var onRender = function() {
		if(!active) return;
		scrollTarget = Math.clamp(scrollTarget, -scrollMax, 0);
		scrollPos += (scrollTarget - scrollPos) * 0.2;
		text.move(0, scrollPos);
		if(iframe) iframe.move(0, scrollPos * 0.5);
	}

	var show = function(data) {
		active = true;
		scrollMax = 0;
		setTimeout(lateShow, 500, data);
	}

	var lateShow = function(data) {
		
		close.css("display", "block");
		content.css("display", "block"); 

		header.domElement().innerHTML = data.name;

		Loader.loadText("data/generic.html", function(d) {
			text.domElement().innerHTML = d;
			onResize();
		});

		var missingDeps = [];
		data.deps.forEach(function(dep) {
			if(!Modernizr[dep]) {
				missingDeps.push(dep);
			}
		});

		// By default all demos display in 16:9 or lower. To make them fullscreen set "aspect": "-1:-1" in json
		var aspect = 9 / 16;

		if(data.aspect != "") {
			var aw = parseInt(data.aspect.split(":")[0]);
			var ah = parseInt(data.aspect.split(":")[1]);
			if(aw == -1) aspect = window.innerHeight / window.innerWidth; 
			else aspect = ah / aw;
		}

		var fh = window.innerWidth * aspect;

		if(fh < window.innerHeight - text.height()) {
			fh = window.innerHeight - text.height();
		}

		if(window.innerWidth < 500) {
			fh = window.innerWidth;
		}

		iframe = new Wrapper(document.createElement("iframe"));
		iframe.domElement().setAttribute("frameBorder", "0");

		iframe.on("load", function(e) {
			iframe.css("opacity", "1");

			iframe.domElement().contentDocument.addEventListener("DOMMouseScroll", function(e) {
				VirtualScroll.invokeFirefox(e);
			});
		});

		iframe.css("opacity", "0");
		iframe.css("height", fh + "px");

		content.domElement().insertBefore(iframe.domElement(), text.domElement());

		iframe.domElement().contentWindow.location.replace(data.url);


	}

	var fadeOut = function() {
		active = false;
		hide();
	}

	var hide = function() {
		active = false;
		close.css("display", "none");
		content.css("display", "none");

		try {
			iframe.domElement().contentWindow.kill();
		} catch(e) {
			// Nevermind
		}

		content.domElement().removeChild(iframe.domElement());
	}

	Broadcast.addClient(Msg.SCROLL, onScroll); 
	Broadcast.addClient(Msg.RENDER, onRender); 
	Broadcast.addClient(Msg.RESIZE, onResize); 

	Broadcast.addClient(Msg.ON_ABOUT_OPEN, hide); 
	Broadcast.addClient(Msg.ON_ITEM_OPEN, show);
	Broadcast.addClient(Msg.ON_ITEM_CLOSE, fadeOut);

	close.on("click", function() {
		Broadcast.send(Msg.ON_ITEM_CLOSE);
	});
}