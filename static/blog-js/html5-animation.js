(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function() {

	var setX = function(element, x) {    
		var t = "translateX(" + x + "px)";  
		var s = element.style;  
		s["transform"] = t;    
		s["webkitTransform"] = t;   
		s["mozTransform"] = t;    
		s["msTransform"] = t; 
	}

	var redbox = document.getElementById("redbox-02");
	setX(redbox, Math.min(window.innerWidth/4, 100));

})();

(function() {

	var redbox = document.getElementById("redbox-03");
	var c = 0, running = true;

	var run = function() {
		if(!running) return;
		requestAnimationFrame(run);
		c++;
		redbox.innerHTML = c;
	}
	
	var start = function() {
		running = true;
		run();
	}

	var stop = function() {
		running = false;
		c = 0;
		redbox.innerHTML = c;
	}

	var startBtn = document.getElementById("redbox-btn-01");
	var stopBtn = document.getElementById("redbox-btn-02");

	startBtn.addEventListener('click', start);
	stopBtn.addEventListener('click', stop);

})();

(function() {

	var redbox = document.getElementById("redbox-04");
	var running = true;
	var startTime;

	var run = function() {
		if(!running) return;
		requestAnimationFrame(run);
		redbox.innerHTML = (new Date().getTime() - startTime) + "ms";
	}
	
	var start = function() {
		startTime = new Date().getTime();
		running = true;
		run();
	}

	var stop = function() {
		running = false;
		redbox.innerHTML = "0ms";
	}

	var startBtn = document.getElementById("redbox-btn-03");
	var stopBtn = document.getElementById("redbox-btn-04");

	startBtn.addEventListener('click', start);
	stopBtn.addEventListener('click', stop);

})();

(function() {

	var redbox = document.getElementById("redbox-05");
	var startTime, duration;

	var run = function() {
		var time = (new Date().getTime() - startTime) / duration;
		redbox.innerHTML = time.toPrecision(4).substring(0, 6);
		if(time < 1) requestAnimationFrame(run);
		else stop();
	}
	
	var start = function() {
		duration = input.value;
		startTime = new Date().getTime();
		run();
	}

	var stop = function() {
		redbox.innerHTML = "1.0000";
	}

	var startBtn = document.getElementById("redbox-btn-05");
	var input = document.getElementById("redbox-input-01");

	startBtn.addEventListener('click', start);
})();

(function() {

	var redbox = document.getElementById("redbox-06");
	var startBtn = document.getElementById("redbox-btn-06");
	var input = document.getElementById("redbox-input-02");

	var startTime, duration;
	var rect = redbox.getBoundingClientRect();
	var startX = 0, endX = window.innerWidth - rect.left * 2 - rect.width;

	var setX = function(element, x) {    
		var t = "translateX(" + x + "px)";  
		var s = element.style;  
		s["transform"] = t;    
		s["webkitTransform"] = t;   
		s["mozTransform"] = t;    
		s["msTransform"] = t; 
	}

	var run = function() {
		var time = (new Date().getTime() - startTime) / duration;
		if(time < 1) {
			requestAnimationFrame(run);
			setX(redbox, startX + (endX - startX) * time);
		} else {
			setX(redbox, endX);
		}
	}
	
	var start = function() {
		duration = input.value;
		startTime = new Date().getTime();
		run();
	}

	startBtn.addEventListener('click', start);
})();

(function() {

	var redbox = document.getElementById("redbox-07");
	var startBtn = document.getElementById("redbox-btn-07");
	var input = document.getElementById("redbox-input-03");

	var startTime, duration;
	var rect = redbox.getBoundingClientRect();
	var startX = 0, endX = window.innerWidth - rect.left * 2 - rect.width;

	var setX = function(element, x) {    
		var t = "translateX(" + x + "px) translateZ(0)";  
		var s = element.style;  
		s["transform"] = t;    
		s["webkitTransform"] = t;   
		s["mozTransform"] = t;    
		s["msTransform"] = t; 
	}

	var easeIn = function(t) {
		// return t * (1 - t * t) + t; // < random experiment
		return t * t;
	}

	var run = function() {
		var time = (new Date().getTime() - startTime) / duration;
		if(time < 1) { requestAnimationFrame(run);
			time = easeIn(time);
			setX(redbox, startX + (endX - startX) * time);
		} else {
			setX(redbox, endX);
		}
	}
	
	var start = function() {
		duration = input.value;
		startTime = new Date().getTime();
		run();
	}

	startBtn.addEventListener('click', start);
})();