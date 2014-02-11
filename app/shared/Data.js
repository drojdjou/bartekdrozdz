(function(exports) {
	 
	exports.Data = (function() {

		var that = {};

		var data;

		var filterProjects = function() {
			var d = {}, i;

			d.projects = [];
			d.play = [];

			for(i = 0; i < data.projects.length; i++) {
				var p = data.projects[i];
				if(!p.hidden) d.projects.push(p);
			}

			for(i = 0; i < data.play.length; i++) {
				var p = data.play[i];
				if(!p.hidden) d.play.push(p);
			}

			return d;
		}

		that.setMain = function(d) {
			data = d;
		}

		that.getMain = function() {
			var d = filterProjects();
			d.conferences = data.conferences;
			d.publications = data.publications;
			return d;
		}

		that.toFilteredJSON = function() {
			var d = {};
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

