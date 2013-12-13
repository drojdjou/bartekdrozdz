Hero = function(container) {

	var hi = {};
	var ASPECT = 2.35;
	var ctn;
	var isDemo;

	hi.setup = function(data) {

		isDemo = (data.type == 'demo');

		if(isDemo) {
			ctn = EXT.create('iframe');
			ctn.ext.attr('frameborder', 0);
			ctn.src = data.url;
		} else {
			ctn = EXT.create('img');
			ctn.src = 'assets/content/1920w-235as/' + data.id + '.jpg';
			
		}

		hi.adjust();		
		container.innerHTML = '';
		container.appendChild(ctn);
	}

	hi.adjust = function() {
		var h, w, ox;

		if(isDemo) {
			h = hi.height();
			w = window.innerWidth;
			ox = 0;
		} else {
			h = hi.height();
			w = h * ASPECT;
			ox = (w - window.innerWidth) * -0.5;
		}

		ctn.ext.height(h);
		ctn.ext.width(w);
		ctn.ext.transform({ x: ox });

	}

	hi.height = function() {
		return Math.max(window.innerWidth / ASPECT, window.innerHeight * 0.75);
	}

	hi.onResize = function() {
		hi.adjust();
	}

	hi.ext = container.ext;
	
	return hi;

}