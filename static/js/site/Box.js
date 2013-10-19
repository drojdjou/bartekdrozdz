window.Box = function(wrapper) {

	wrapper.id = wrapper.attr('data-id');

	var imageLoaded = false;

	var canvas, context, img;
	var hoverLeft, hoverTop, hoverRight, hoverBottom;

	var container = wrapper.select("div:nth-of-type(1)");
	var mask = container.select(".mask").e();

	canvas = container.select("canvas");
	img = new Image();
	
	var imagePath = canvas.attr("data-image-large");
	var tint = canvas.attr("data-tint");

	img.onload = function() {
		var w = canvas.e().width = container.rect().width * 2 | 0;
		var h = canvas.e().height = container.rect().height * 2 | 0;

		context = canvas.e().getContext('2d');

		imageCanvas = document.createElement("canvas");
		imageContext = imageCanvas.getContext('2d');
		imageCanvas.width = w;
		imageCanvas.height = h;

		var rgb = "rgb(" + (Math.random() * 255 | 0) + ", 0, 0)";
		imageContext.fillStyle = rgb;
	 	imageContext.fillRect(0, 0, w, h);
		imageContext.drawImage(img, 0 , 0, w, h);

		var g = imageContext.createLinearGradient(0, 0, 0, h);
		g.addColorStop(0.6, 'rgba(0,0,0,0)');   
		g.addColorStop(1, 'rgba(0,0,0,0.5)');

      	imageContext.fillStyle = g;
      	imageContext.fillRect(0, 0, w, h);

      	context.drawImage(imageCanvas, 0, 0, w, h);

		//img = null;

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

		mask.style.backgroundColor = "rgba(0, 0, 0, 0)";
		imageLoaded = true;
	}

	var onHover =function(e) {
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

	var trackBox = function(e) {
		var bb = wrapper.e().getBoundingClientRect();

		if(!imageLoaded) {
			if(bb.top < window.innerHeight) {
				img.src = imagePath;
			}
		} else {
			var h = Math.pointInRect(e, bb);

			if(h != hovered) {
				if(h) onHover();
				else onHout();
			} 

			hovered = h;
		}
	}

	Broadcast.addClient(Msg.RENDER, trackBox); 

	return wrapper;
};