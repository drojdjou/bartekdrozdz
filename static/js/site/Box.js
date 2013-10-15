window.Box = function(wrapper) {

	wrapper.id = wrapper.attr('data-id');

	var c = 0.1;

	var img = wrapper.select("div:nth-of-type(1) img").e();
	var div = wrapper.select("div:nth-of-type(1) div").e();

	var imagePath = img.getAttribute("data-image-large");

	img.onload = function() {
		div.style.backgroundColor = "rgba(0, 0, 0, 0)";
	}

	var isInViewport = function(e) {
		var bb = wrapper.e().getBoundingClientRect();

		if(bb.top < window.innerHeight) {
			img.src = imagePath;
			Broadcast.removeClient(Msg.RENDER, isInViewport);
		}
	}

	Broadcast.addClient(Msg.RENDER, isInViewport); 

	return wrapper;
};