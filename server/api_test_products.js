/*
 * Serve JSON to our AngularJS client
 */
var my_bd = require('./my_bd');

exports.atelier_products = function (req, res) {

    var productColl = my_bd.Collection.extend({
		tableName: 'product'
	});
	new productColl().fetch().then(function(result) {
	  //console.log(result.toJSON());
	  res.json({
			products: result
		});
	});
};

exports.add_product = function (req, res) {

    var product = my_bd.Model.extend({
		tableName: 'product',
		defaults: {
		    sku: '',
		    name: '',
		    description: '',
		    price: '',
		    cal: '',
		    nutrients: '',
		    img_path: ''
    	}
	});

	var product = new product(),
	productDetails = {name: req.body.name, description: req.body.description};

	product.save(productDetails, {
		success: function(product){
			console.log('success');
		},
		error: function(error){
	    	console.log('error');
		}
	});
};

exports.update_product = function (req, res) {
	//console.log(req.body.ID);
    var product = my_bd.Model.extend({
		tableName: 'product',
		defaults: {
	        sku: '',
	        name: '',
	        description: '',
	        price: '',
	        cal: '',
	        nutrients: '',
	        img_path: ''
    	}	
	});

	var product = new product({id: req.body.id}),
	productDetails = {name: req.body.name, description: req.body.description};

	product.save(productDetails, {
		success: function(product){
			console.log('success');
		},
		error: function(error){
	    	console.log('error');
		}
	});

};

exports.delete_product = function (req, res) {
    var product = my_bd.Model.extend({
		tableName: 'product',
		defaults: {
		    sku: '',
		    name: '',
		    description: '',
		    price: '',
		    cal: '',
		    nutrients: '',
		    img_path: ''
    	}
	});

	var product = new product({id: req.body.id});

	product.destroy({
		success: function(product){
			console.log('success');
		},
		error: function(error){
	    	console.log('error');
		}
	});

};