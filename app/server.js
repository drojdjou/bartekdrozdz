var express = require('express');
var path = require('path');
var hbs = require('hbs');
var fs = require('fs');

require('../static/shared/Data.js');
Data.setMain(require('../data/main.json'));

var serverRoot = process.argv[2];

if(!serverRoot || serverRoot == "") {
	console.log("Server root not provided, defaulting to ./");
	serverRoot = "./";
}


var config = {
	noscript: false
};

hbs.registerHelper('noscript', function(options) {
	if(config.noscript) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});


var app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static('static'));

app.get('/', function(request, response) {
	config.noscript = false;
	response.render('index', Data.getMain());
});

app.get('/noscript', function(request, response) {
	config.noscript = true;
	response.render('index', Data.getMain());
});

app.get('/data', function(request, response) {
	response.send(Data.getMain());
});

app.get('/data/:name', function(request, response) {
	var p = path.resolve(serverRoot + 'data/items/' + request.params.name + '.html');
	response.sendfile(p);
});

app.get('/project/:name', function(request, response) {
	var p = path.resolve(serverRoot + 'data/items/' + request.params.name + '.html');
	
	fs.readFile(p, function (err, fileContent) {
	  if (err) throw err;
	  response.render('project', { 
	  	content: fileContent, 
	  	item: Data.getProjectById(request.params.name) 
	  });
	});

	
});
 
app.listen(3123);















