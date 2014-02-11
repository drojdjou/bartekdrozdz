(function(exports) {

	var fs = require("fs");
	 
	var postsPath = '/data/blog';
	var metaTagMatch = /<!--#([a-zA-Z0-9]*).*-->/;
	var posts, postlist;
	var basePath;

	var init = function(_basePath) {
		basePath = _basePath;
		load();
	}

	var getPost = function(path, reload) {
		if(reload) load();
		return posts[path];
	}

	var getPostList = function(reload) {
		if(reload) load();
		return postlist;
	}

	var load = function() {

		posts = {};
		postlist = [];

		var files = fs.readdirSync(basePath + postsPath);

		files.forEach(function(file) {

			if(file.indexOf('.html') < 0) return;

			var p = fs.readFileSync(basePath + postsPath + "/" + file, { encoding:'utf8' });
			
			var lines = p.split("\n"), currentSection, post = {};

			for(var i = 0; i < lines.length; i++) {

				var line = lines[i], m;

				if(m = line.match(metaTagMatch)) {
					currentSection = m[1];
					post[currentSection] = [];
				} else {
					post[currentSection].push(line);
				}
			}

			for(var section in post) {

				post[section] = post[section].join("\n").trim();

				switch(section) {
					case "excerpt":
						var e = post[section].split("\n");
						post.subtitle = e[0];
						post.title = e[1];
						post.lead = e[2];
						break;
					case "scripts":
						post[section] = post[section].split(",");	
						break;					
				}

				// if(section != "content") console.log(section + ": " + post[section]);
			}

			posts[file] = post;	
			postlist.push(post);	
		});
	}
	
	exports.Blog = {
		init: init,
		getPost: getPost,
		getPostList:getPostList
	};
 
})((typeof process === 'undefined' || !process.versions) ? window : exports);

// ## ### ####

if (!module.parent) {
	console.log("Blog running in standalone mode");
}