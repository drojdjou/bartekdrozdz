window.Broadcast = (function() {

	var clients = {};

	var b = function() {

		this.send = function(m, mo) {
			var mc = clients[m];
			if(!mc) return;			
			var n = mc.length;
			
			for(var i = 0; i < n; i++) {
				if(mc[i]) mc[i](mo);
			}
		}

		this.addClient = function(m, c) {
			if(!clients[m]) clients[m] = [];

			var mc = clients[m];
			if(mc[c] > -1) return;
			mc.push(c);
		}

		this.removeClient = function(m, c) {
			var mc = clients[m];

			if(!mc) return;	
			return mc.splice(mc.indexOf(c), 1);
		}

		this.getClients = function(m) {
			return clients[m];
		}
	}

	return new b();

})();