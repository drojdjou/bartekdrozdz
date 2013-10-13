var RL = (function() {

	var rl = {};

	rl.setRlc = function(r) {}

	rl.log = function(message) {
		console.log("RL", message);
	}

	rl.warn = function(message) {
		console.warn("RL", message);
	}

	rl.error = function(message) {
		console.error("RL", message);
	}

	return rl;

})();