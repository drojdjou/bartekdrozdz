var AWS = require('aws-sdk');
var fs = require('fs');

var walk    = require('walk');
var files   = [];

// Walker options
var walker  = walk.walk('./static', { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
});

walker.on('end', function() {
    console.log(files);
});

// AWS.config.loadFromPath('./config.json');

// var s3 = new AWS.S3();

// fs.readFile('../static/assets/content/cuba-235.jpg', function (err, data) {
// 	if (err) throw err;

// 	var params = {
// 	    Bucket: 'bartekdrozdz',
// 	    Key: 'static/assets/cuba-235.jpg',
// 	    Body: data,
// 	    ACL: 'public-read',
// 	    ContentType: 'image/jpeg'
// 	};

// 	s3.putObject(params, function (perr, pres) {
// 	    if (perr) {
// 	        console.log("Error uploading data: ", perr);
// 	    } else {
// 	        console.log("Successfully uploaded data to static/assets/cuba-235.jpg");
// 	    }
// 	});
// });

