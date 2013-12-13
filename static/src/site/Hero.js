Hero = function(container) {

	var hi = {};
	var ASPECT = 2.35;
	var ctn;

	hi.setup = function(data) {

		var h, w, ox;

		if(data.type == 'demo') {
			ctn = EXT.create('iframe');
			ctn.ext.attr('frameborder', 0);
			ctn.src = data.url;
			h = hi.height();
			w = window.innerWidth;
			ox = 0;
		} else {
			ctn = EXT.create('img');
			ctn.src = 'assets/content/1920w-235as/' + data.id + '.jpg';
			h = hi.height();
			w = h * ASPECT;
			ox = (w - window.innerWidth) * -0.5;
		}

		


		ctn.ext.height(h);
		ctn.ext.width(w);
		ctn.ext.transform({ x: ox });

		container.innerHTML = '';
		container.appendChild(ctn);
	}

	hi.height = function() {
		return Math.max(window.innerWidth / ASPECT, window.innerHeight * 0.75);
	}

	hi.ext = container.ext;
	
	return hi;

}