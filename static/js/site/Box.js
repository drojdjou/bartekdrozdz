window.Box = function(wrapper) {

	wrapper.id = wrapper.attr('data-id');

	var imageLoaded = false;

	var hoverLeft, hoverTop, hoverRight, hoverBottom, touchFrame;

	var container = wrapper.select("div:nth-of-type(1)");
	var mask = container.select(".mask");

	var img = container.select("img");
	
	var imagePath = img.attr("data-image-large");
	var tint = img.attr("data-tint");

	img.on("load", function() {

		if(!Simplrz.touch) {
			hoverLeft = Wrapper.create("div");
			hoverTop = Wrapper.create("div");
			hoverRight = Wrapper.create("div");
			hoverBottom = Wrapper.create("div");

			hoverLeft.attr("class", "hover-frame left in-first");
			hoverTop.attr("class", "hover-frame top in-first");
			hoverRight.attr("class", "hover-frame right in-second");
			hoverBottom.attr("class", "hover-frame bottom in-second");

			hoverLeft.css("backgroundColor", tint);
			hoverTop.css("backgroundColor", tint);
			hoverRight.css("backgroundColor", tint);
			hoverBottom.css("backgroundColor", tint);
			
			container.e().appendChild(hoverLeft.e());
			container.e().appendChild(hoverTop.e());
			container.e().appendChild(hoverRight.e());
			container.e().appendChild(hoverBottom.e());
			Broadcast.addClient(Msg.RENDER, trackHover);
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

		hoverLeft.scale(1, 1);
		hoverTop.scale(1, 1);
		hoverRight.scale(1, 1);
		hoverBottom.scale(1, 1);
	};

	var onHout = function(e) {
		hoverLeft.attr("class", "hover-frame left out-first");
		hoverTop.attr("class", "hover-frame top out-first");
		hoverRight.attr("class", "hover-frame right out-second");
		hoverBottom.attr("class", "hover-frame bottom out-second");

		hoverLeft.scale(1, 0);
		hoverTop.scale(0, 1);
		hoverRight.scale(1, 0);
		hoverBottom.scale(0, 1);
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