var express = require('express');
var path = require('path');
var hbs = require('hbs');

var data = require('../data/main.json');
var serverRoot = process.argv[2];

if(!serverRoot || serverRoot == "") {
	console.log("Server root not provided, defaulting to ./");
	serverRoot = "./";
}

var app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static('static'));

app.get('/', function(request, response) {
	response.render('index', data);
});

app.get('/data', function(request, response) {
	response.send(data);
});

app.get('/data/:name', function(request, response) {
	var p = path.resolve(serverRoot + 'data/items/' + request.params.name + '.html');
	response.sendfile(p);
});
 
app.listen(3123);