var express = require('express');
var hbs = require('hbs');

var data = require('../data/main.json');

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
 
app.listen(3123);