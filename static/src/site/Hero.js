Hero = function(container) {

	var hi = {};
	var ASPECT = 2.35;
	var ctn;
	var isDemo;

	hi.setup = function(data) {

		var missingDeps = [];
		data.deps.forEach(function(dep) {
			if(!Simplrz[dep]) {
				missingDeps.push(dep);
			}
		});

		isDemo = (data.type == 'demo' && missingDeps.length == 0);

		if(isDemo) {
			ctn = EXT.create('iframe');
			ctn.ext.attr('frameborder', 0);
			ctn.src = data.url;
		} else {
			ctn = EXT.create('img');
			ctn.src = 'assets/content/1920w-235as/' + data.id + '.jpg';
		}

		ctn.ext.on('load', function() {
			ctn.ext.transition({ opacity: 1 }, 200, 'ease-out');
		});

		hi.adjust();
		ctn.ext.css('opacity', 0);
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

		container.ext.height(h);

		if(ctn) {
			ctn.ext.height(h);
			ctn.ext.width(w);
			ctn.ext.transform({ x: ox });
		}
	}

	hi.kill = function() {
		if(ctn) {
			try {
				ctn.contentWindow.kill();
			} catch(e) {
				// Np
			}

			container.removeChild(ctn);
			ctn.innerHTML = "";
			ctn = null;
		}
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