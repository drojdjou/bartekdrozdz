(function(exports) {
	 
	exports.Data = (function() {

		var that = {};

		var data;

		that.setMain = function(d) {
			data = d;
		}

		that.getMain = function() {
			return data;
		}

		that.toFilteredJSON = function() {
			var d = {}
			d.projects = data.projects;
			d.play = data.play;
			return JSON.stringify(d);
		}

		that.getProjectById = function(id) {

			id = (id.indexOf("?") > -1) ? id.split("?")[0] : id;

			var np = data.projects.length;
			var nl = data.play.length;
			var p, i

			for(i = 0; i < np; i++) {
				p = data.projects[i];
				if(p.id == id) return p;
			}

			for(i = 0; i < nl; i++) {
				p = data.play[i];
				if(p.id == id) return p;
			}
		}

		return that;

	})();
 
})((typeof process === 'undefined' || !process.versions) ? window : exports);

