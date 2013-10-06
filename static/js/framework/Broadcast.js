Broadcast = (function() {

	var clients = {};

	var b = function() {

		this.send = function(m, mo) {
			if(!clients[m]) return;			
			
			var n = clients[m].length;

			for(var i = 0; i < n; i++) {
				clients[m][i](mo);
			}
		}

		this.addClient = function(m, c) {
			if(!clients[m]) clients[m] = [];
			clients[m].push(c);
		}

		this.removeClient = function(m, c) {
			if(!clients[m]) return;	
			clients[m].splice(clients[m].indexOf(c), 1);
		}

	}

	return new b();

})();