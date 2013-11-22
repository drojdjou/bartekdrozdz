window.Box = function(wrapper) {

	wrapper.id = wrapper.attr('data-id');

	var imageLoaded = false;

	var hoverLeft, hoverTop, hoverRight, hoverBottom, touchFrame;

	var container = wrapper.select("div:nth-of-type(1)");
	var hoverContainer = wrapper.select(".hover");
	var mask = container.select(".mask");

	var img = container.select("img");
	
	var tint = img.attr("data-tint");
	var type = wrapper.attr("data-type");

	var largeScreen = window.innerWidth > 768;
	var largeFolder = (type == "project") ? "675sq" : "400sq";
	var smallFolder = (type == "project") ? "320sq" : "200sq";
	var imageFolder = (largeScreen) ? largeFolder : smallFolder;
	var imagePath = "assets/content/%f%/%id%.jpg".replace("%f%", imageFolder).replace("%id%", wrapper.id);

	// console.log(type, largeFolder, smallFolder, imageFolder, imagePath);

	img.on("load", function() {

		if(!Simplrz.touch) {
			// hoverLeft = Wrapper.create("div");
			// hoverTop = Wrapper.create("div");
			// hoverRight = Wrapper.create("div");
			// hoverBottom = Wrapper.create("div");

			// hoverLeft.attr("class", "hover-frame left in-first");
			// hoverTop.attr("class", "hover-frame top in-first");
			// hoverRight.attr("class", "hover-frame right in-second");
			// hoverBottom.attr("class", "hover-frame bottom in-second");

			// hoverLeft.css("backgroundColor", tint);
			// hoverTop.css("backgroundColor", tint);
			// hoverRight.css("backgroundColor", tint);
			// hoverBottom.css("backgroundColor", tint);
			
			// hoverContainer.e().appendChild(hoverLeft.e());
			// hoverContainer.e().appendChild(hoverTop.e());
			// hoverContainer.e().appendChild(hoverRight.e());
			// hoverContainer.e().appendChild(hoverBottom.e());
			// Broadcast.addClient(Msg.RENDER, trackHover);
			// onHover();
		} else {
			touchFrame = Wrapper.create("div");
			touchFrame.attr("class", "frame");
			touchFrame.css("borderColor", tint);
			container.e().appendChild(touchFrame.e());
		}

		mask.css("backgroundColor", "rgba(0, 0, 0, 0)");
	});

	var onHover = function(e) {
		hoverLeft.attr("class", "hover-frame left in-first");
		hoverTop.attr("class", "hover-frame top in-first");
		hoverRight.attr("class", "hover-frame right in-second");
		hoverBottom.attr("class", "hover-frame bottom in-second");

		// var sx = 0.9, sy = 0.9;
		// hoverLeft.scale(sx, sy);
		// hoverTop.scale(sx, sy);
		// hoverRight.scale(sx, sy);
		// hoverBottom.scale(sx, sy);

		hoverLeft.css("height", "100%");
		hoverTop.css("width", "100%");
		hoverRight.css("height", "100%");
		hoverBottom.css("width", "100%");
	};

	var onHout = function(e) {
		hoverLeft.attr("class", "hover-frame left out-first");
		hoverTop.attr("class", "hover-frame top out-first");
		hoverRight.attr("class", "hover-frame right out-second");
		hoverBottom.attr("class", "hover-frame bottom out-second");

		// hoverLeft.scale(1, 0);
		// hoverTop.scale(0, 1);
		// hoverRight.scale(1, 0);
		// hoverBottom.scale(0, 1);

		hoverLeft.css("height", "0");
		hoverTop.css("width", "0");
		hoverRight.css("height", "0");
		hoverBottom.css("width", "0");
	};

	var hovered = false;

	var trackBox = function() {
		var bb = wrapper.e().getBoundingClientRect();
		if(bb.top < window.innerHeight) {
			img.e().src = imagePath;
			Broadcast.removeClient(Msg.RENDER, trackBox); 
		}
	}

	var trackHover = function(e) {
		var bb = wrapper.e().getBoundingClientRect();
		var h = Math.pointInRect(e, bb);
		if(h != hovered) {
			if(h) onHover();
			else onHout();
		} 
		hovered = h;
	}

	Broadcast.addClient(Msg.RENDER, trackBox); 

	return wrapper;
};