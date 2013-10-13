var RL = (function() {

	var rl = {};

	var initialized = false;

	var socket, rlc;

	var getQueryStringParam = function(name) {
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	var init = function() {
		var port = 7001;
	    var serverUrl = 'http://ec2.bartekdrozdz.com:' + port;
	    // var serverUrl = 'http://' + location.host + ':' + port;

	    if(!io) {
	    	console.error("RL Fatal: socket.io not found!");
	    	return;
	    }

	    try {
	    	socket = io.connect(serverUrl);
	    } catch(e) {
	    	console.error("RL Fatal: socket.io not found!");
	    	return;
	    }

	    rlc = rlc || getQueryStringParam("rlc") || "default";

	    initialized = true;
	}

	var wrap = function(m) {
		var w = {};
		w.hostname = location.hostname;
		w.pathname = location.pathname;
		w.platform = navigator.platform;
		w.userAgent = navigator.userAgent;
		w.message = m;
		w.rlc = rlc;

		return w;
	}

	rl.setRlc = function(r) {
		rlc = r;
	}

	rl.log = function(message) {
		if(!initialized) init();
		socket.emit("log", wrap(message));
	}

	rl.warn = function(message) {
		if(!initialized) init();
		socket.emit("warn", wrap(message));
	}

	rl.error = function(message) {
		if(!initialized) init();
		socket.emit("error", wrap(message));
	}

	return rl;

})();