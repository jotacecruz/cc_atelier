/*
 * Serve JSON to our AngularJS client
 */
var my_bd = require('./my_bd');

var produtoColl = my_bd.Collection.extend({
	tableName: 'cc_produtos',
	defaults: {
	    marca: '',
	    referencia: '',
	    id_categorias: '1',	    
	    id_fornecedores: '1',
		descricao: '',
	    cor: '',
	    material: '',
	    dimensoes: '',
	    stock_total: 0,
	    stock_reservado: 0,
	    stock_saida: 0,
	    preco_base: 0,
	    preco_pvp: 0,
	    preco_transporte: 0,
	    nome_imagem: '',
	    estado: '',
	    pago: 0,
	    updated: new Date(),
	    created: new Date(),
	    updated_by: '',
	    created_by: ''
	}
});

var produtoItem = my_bd.Model.extend({
	tableName: 'cc_produtos',
	defaults: {
	    marca: '',
	    referencia: '',
	    id_categorias: '1',	    
	    id_fornecedores: '1',
		descricao: '',
	    cor: '',
	    material: '',
	    dimensoes: '',
	    stock_total: 0,
	    stock_reservado: 0,
	    stock_saida: 0,
	    preco_base: 0,
	    preco_pvp: 0,
	    preco_transporte: 0,
	    nome_imagem: '',
	    estado: '',
	    pago: 0,
	    updated: new Date(),
	    created: new Date(),
	    updated_by: '',
	    created_by: ''
	}
});

exports.getall = function (req, res) {

	new produtoColl().fetch().then(function(result) {
	  //console.log(result.toJSON());
	  res.json({
			produtos: result
		});
	});
};

exports.add_produto = function (req, res) {

	var produto = new produtoItem(),
	produtoDetails = {
	    marca: req.body.marca,
	    referencia: req.body.referencia,
	    id_categorias: req.body.id_categorias,	    
	    id_fornecedores: req.body.id_fornecedores,
	    descricao: req.body.descricao,
	    cor: req.body.cor,
	    material: req.body.material,
	    dimensoes: req.body.dimensoes,
	    stock_total: req.body.stock_total,
	    stock_reservado: req.body.stock_reservado,
	    stock_saida: req.body.stock_saida,
	    preco_base: req.body.preco_base,
	    preco_pvp: req.body.preco_pvp,
	    preco_transporte: req.body.preco_transporte,
	    nome_imagem: req.body.nome_imagem,
	    // estado: req.body.estado,
	    // pago: req.body.pago,
	    updated: new Date(),
	    created: new Date(),
	    // updated_by: req.body.updated_by,
	    // created_by: req.body.created_by,

	};
	console.log(produtoDetails);
	produto.save(produtoDetails, {
		success: function(produto){
			console.log('success');
		},
		error: function(error){
	    	console.log('error');
		}
	});
};

exports.update_produto = function (req, res) {
	//console.log(req.body);

	var produto = new produtoItem({id: req.body.id}),
	produtoDetails = {
	    marca: req.body.marca,
	    referencia: req.body.referencia,
	    id_categorias: req.body.id_categorias,	    
	    id_fornecedores: req.body.id_fornecedores,
	    descricao: req.body.descricao,
	    cor: req.body.cor,
	    material: req.body.material,
	    dimensoes: req.body.dimensoes,
	    stock_total: req.body.stock_total,
	    stock_reservado: req.body.stock_reservado,
	    stock_saida: req.body.stock_saida,
	    preco_base: req.body.preco_base,
	    preco_pvp: req.body.preco_pvp,
	    preco_transporte: req.body.preco_transporte,
	    nome_imagem: req.body.nome_imagem,
	    // estado: req.body.estado,
	    // pago: req.body.pago,
	    updated: new Date()
	    // updated_by: req.body.updated_by
	};

	//console.log("BEFORE SAVE");
	produto.save(produtoDetails, {}).then(function(model) {
		res.end('success');
	});

};

exports.delete_produto = function (req, res) {

	var produto = new produtoItem({id: req.body.id});
	produto.destroy({}).then(function(model) {
		res.end('success');
	});

};