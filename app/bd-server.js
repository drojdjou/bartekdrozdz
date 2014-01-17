var express = require('express');
var path = require('path');
var hbs = require('hbs');
var fs = require('fs');
var strftime = require('strftime');

var data = require('./shared/Data').Data;

data.setMain(require('../data/main.json'));

var serverRoot = process.argv[2];
var defaultToDev = (process.argv[3] == "dev");
var port = process.argv[4] || 3123;

if(!serverRoot || serverRoot == "") {
	console.log(strftime('%d %b %H:%M:%S') + " - [bd-server] - Server root not provided, defaulting to ./");
	serverRoot = "./";
}


var context = {
	config: {
		javascriptEnabled: true,
		dev: defaultToDev,
		jsq: '',
		cdn: 'http://cdn.bartekdrozdz.com/'
	},

	imports: require('../data/imports.json'),
	data: data.getMain(),
	dataJson: data.toFilteredJSON()
};

var app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static('static'));


var renderIndex = function(response) {
	response.render('index', context);
}

var parseQuery = function(request) {
	if(request.query.ns != null) context.config.javascriptEnabled = false;
	else context.config.javascriptEnabled = true;
	context.config.jsq = (context.config.javascriptEnabled) ? '' : '?ns';
	if(!!request.query.dev) context.config.dev = (request.query.dev == "false") ? false : true;
	else context.config.dev = defaultToDev;

	context.config.path = request.path;
}

// Content routes
app.get('/', function(request, response) {
	parseQuery(request);
	renderIndex(response);
});

app.get('/about', function(request, response) {
	renderIndex(response);
});

app.get('/project/:name', function(request, response) {
	parseQuery(request);

	if(context.config.javascriptEnabled) {
		renderIndex(response);
	} else {
		var p = path.resolve(serverRoot + 'data/items/' + request.params.name + '.html');
		
		fs.readFile(p, function (err, fileContent) {
		  if (err) throw err;
		  response.render('project', { 
		  	content: fileContent, 
		  	item: data.getProjectById(request.params.name),
		  	config: context.config
		  });
		});
	}
});

// Data routes
app.get('/data', function(request, response) {
	response.send(data.getMain());
});

app.get('/blog', function(request, response) {
	response.redirect('/');
});

app.get('/context', function(request, response) {
	response.send(context);
});

app.get('/data/:name', function(request, response) {
	var p = path.resolve(serverRoot + 'data/items/' + request.params.name + '.html');
	response.sendfile(p);
});

app.get('/shared/:name', function(request, response) {
	var p = path.resolve(serverRoot + 'app/shared/' + request.params.name);
	response.sendfile(p);
});

app.listen(port);

console.log("Server started on port " + port);















