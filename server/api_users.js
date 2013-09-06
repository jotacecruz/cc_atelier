/*
 * Serve JSON to our AngularJS client
 */
var my_bd = require('./my_bd');
//var Bookshelf = require('bookshelf');

//Bookshelf.Initialize({
//  client: 'mysql',
//  connection: {
//	host     : 'catherinecabral.com',
//	user     : 'cathe',
//	password : 'cabral2012',
//	database : 'cathe_shop',
//    charset  : 'utf8'
//  }
//});

exports.atelier_users = function (req, res) {

    var UserColl = my_bd.Collection.extend({
		tableName: 'wp_users'
	});
	new UserColl().fetch().then(function(result) {
	  //console.log(result.toJSON());
	  res.json({
			users: result
		});
	});
};

exports.add_user = function (req, res) {

    var User = my_bd.Model.extend({
		tableName: 'wp_users',
		defaults: {
	        user_login: '',
	        user_pass: '',
	        user_nicename: '',
	        user_email: '',
	        user_url: '',
	        user_activation_key: '',
	        display_name: ''
    }
	});

	var user = new User(),
	userDetails = {user_login: req.body.user_login, user_email: req.body.user_email};

	user.save(userDetails, {
		success: function(user){
			console.log('success');
	    	//console.log(user.toJSON());
		},
		error: function(error){
	    	console.log('error');
		}
	});
};

exports.update_user = function (req, res) {
	//console.log(req.body.ID);
    var User = my_bd.Model.extend({
		tableName: 'wp_users',
		defaults: {
	        user_login: '',
	        user_pass: '',
	        user_nicename: '',
	        user_email: '',
	        user_url: '',
	        user_activation_key: '',
	        display_name: ''
    }
	});
	// new User({ID: req.body.ID}).fetch().then(function(summary) {
	//   console.log(summary.toJSON());
	// });

	var user = new User({id: req.body.id}),
	userDetails = {user_login: req.body.user_login, user_email: req.body.user_email};

	user.save(userDetails, {
		success: function(user){
			console.log('success');
	    	//console.log(user.toJSON());
		},
		error: function(error){
	    	console.log('error');
		}
	});

};

exports.delete_user = function (req, res) {
	//console.log(req.body);
    var User = my_bd.Model.extend({
		tableName: 'wp_users',
		defaults: {
	        user_login: '',
	        user_pass: '',
	        user_nicename: '',
	        user_email: '',
	        user_url: '',
	        user_activation_key: '',
	        display_name: ''
    }
	});

	var user = new User({id: req.body.id});

	user.destroy({
		success: function(user){
			console.log('success');
	    	//console.log(user.toJSON());
		},
		error: function(error){
	    	console.log('error');
		}
	});

};