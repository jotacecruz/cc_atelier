
/*
 * GET home page.
 */
 var fs = require('fs');

//workaround for F5 (refresh)
exports.index = function(req, res){
	fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, content) {
		res.send(content);
	});
};

