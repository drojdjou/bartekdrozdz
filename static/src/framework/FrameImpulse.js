FrameImpulse = (function() {

    var vendors = ['webkit', 'moz'];

    var fpsDiv;// = document.getElementById("fps");
    var lastTime = 0, frameIndex = 0;
    var sumFrame = 0, avgFrame = 16, avgFPS = 60;
    var lowFPS = 60, fpsMeasureTime = 1000;

    var r = {};
	var listeners = [], numListeners = 0, toRemove = [], numToRemove;

	r.fps = 60;

    for(var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { 
            	callback(currTime + timeToCall); 
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

 //    if(fpsDiv) {
	// 	document.addEventListener('keydown', function(e) {
	// 		if(e.keyCode == 32) {
	// 			fpsDiv.style.display = 'block';
	// 		}
	// 	});
	// }

	var calculateFPS = function(deltaTime) {
		frameIndex++;

		var frameTime = (deltaTime - lastTime);

		if(isNaN(frameTime)) frameTime = 1000/60;
		lastTime = deltaTime;

		// if(frameIndex < 10 || frameIndex % 10 == 0) console.log(frameTime);
		sumFrame += frameTime;

		// avgFrame = sumFrame / frameIndex;
		avgFrame = (frameTime + avgFrame * (fpsMeasureTime-1)) / fpsMeasureTime;

		avgFPS = 1000 / avgFrame;
		lowFPS = Math.min(avgFPS, lowFPS);
		
		r.fps = (isNaN(avgFPS) || !avgFPS) ? 60 : avgFPS;
		r.fpsNow = 1000 / frameTime;
		r.fpsLow = lowFPS;

		if(!fpsDiv) return;

		if(avgFrame > 20) {
			fpsDiv.innerHTML = '<b>'+(avgFPS|0)+'</b> | ' + (avgFrame|0);
		} else {
			fpsDiv.innerHTML = (avgFPS|0) + ' | ' + (avgFrame|0);
		}
	}

	var run = function(deltaTime) {
		requestAnimationFrame(run);

		calculateFPS(deltaTime);

		if(numListeners == 0) return;

		//var i = numListeners;
		//while(i--) {
		for(var i = 0; i < numListeners; i++) {
			listeners[i].call(deltaTime);
		}

		if(numToRemove > 0) {
			
			for(var i = 0; i < numToRemove; i++) {
				listeners.splice(toRemove[i], 1);
				// console.log("FrameImpulse > removed listener > total :", numListeners);
			}

			numListeners = listeners.length;
			toRemove = [];
			numToRemove = 0;
		}		
	}

	r.on = function(f) {
		if(listeners.indexOf(f) > -1) {
			return;
		}

		listeners.push(f);
		numListeners = listeners.length;
		// console.log("FrameImpulse > new listener > total :", numListeners);
	}

	r.off = function(f) {
		toRemove.push(f);
		numToRemove = toRemove.length;
		// console.log("FrameImpulse > scheduled removal > total :", numListeners);
	}

	r.getListeners = function() {
		return listeners;
	}
	
	run();
	return r;

})();
