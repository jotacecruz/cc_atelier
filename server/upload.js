var fs = require('fs');
var request = require('request');

exports.upload = function(req, res){
	//console.log(req.files.file);
	//console.log(req.file.path);

	//fs.readFile(req.files.file.path, function (err, data) {
		var stream = fs.createReadStream(req.files.file.path);
		//var newPath = __dirname + "\\" + req.files.file.name;
		//console.log(newPath);
		//fs.writeFile(newPath, data, function (err) {			
		
			var options = {
				oauth : {
					consumer_key : "e405abbf-a085-4358-b5a3-fab9d2da2e90",
					consumer_secret : "161848567838794498680469419915810048422",
					token : "634ed92cf2fc4526838ba3f5fc9df7db",
					token_secret : "vth7UVwt6rlnwNPk"
			    },
				method : 'post',
				uri : "https://api-content.cloudpt.pt/1/Files/cloudpt/produtos/" + req.files.file.name + "?overwrite=true",
				timeout : 0
			};

			options.headers = options.headers || {};
			options.headers['content-length'] = req.files.file.size;
			//fs.createReadStream(newPath).pipe(request(options, function(error, response, body) {
			stream.pipe(request(options, function(error, response, body) {
				//console.log(response);
				//callback(body);
				//delete file
				// fs.unlink(newPath, function (err) {
				// 	if (err) throw err;
				// 		console.log('successfully deleted');
				// });

				var link_options = {
					oauth : {
						consumer_key : "e405abbf-a085-4358-b5a3-fab9d2da2e90",
						consumer_secret : "161848567838794498680469419915810048422",
						token : "634ed92cf2fc4526838ba3f5fc9df7db",
						token_secret : "vth7UVwt6rlnwNPk"
				    },
					method : 'post',
					uri : "https://publicapi.cloudpt.pt/1/Shares/cloudpt/produtos/" + req.files.file.name,
					timeout : 0
				};

				request(link_options, function(error, response, body) {					
					var response_json = JSON.parse(body);
					var img_path = "https://cld.pt/dl/download/" + response_json.link_shareid + "/"  + req.files.file.name;
					res.end(img_path);
				});
			}));			
		//});
	//});
};