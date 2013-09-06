/*
 * Serve JSON to our AngularJS client
 */
var my_bd = require('./my_bd');

var fornecedorColl = my_bd.Collection.extend({
	tableName: 'cc_fornecedores',
	defaults: {
		nome: '',
		comercial: '',
		contacto_fixo: '',
		descricao1: '',
		contacto1: '',
		descricao2: '',
		contacto2: '',
		email1: '',
		email2: '',
		morada: '',
		codigo_postal: '',
		localidade: '',
		nif: '',
		nib1: '',
		nib2: '',
		swift: '',
		iban: '',
		observacoes: '',
		tipo: '',
		updated: new Date(),
		created: new Date(),
		updated_by: 'sistema',
		created_by: 'sistema'
	}
});

var fornecedorItem = my_bd.Model.extend({
	tableName: 'cc_fornecedores',
	defaults: {
		nome: '',
		comercial: '',
		contacto_fixo: '',
		descricao1: '',
		contacto1: '',
		descricao2: '',
		contacto2: '',
		email1: '',
		email2: '',
		morada: '',
		codigo_postal: '',
		localidade: '',
		nif: '',
		nib1: '',
		nib2: '',
		swift: '',
		iban: '',
		observacoes: '',
		tipo: '',
		updated: new Date(),
		created: new Date(),
		updated_by: 'sistema',
		created_by: 'sistema'
	}
});

exports.getall = function (req, res) {
	
	new fornecedorColl().fetch().then(function(result) {
	  //console.log(result.toJSON());
	  res.json({	  		
			fornecedores: result
		});
	});
};

exports.add_fornecedor = function (req, res) {

	var fornecedor = new fornecedorItem(),
	fornecedorDetails = { 
        nome: req.body.nome,
        comercial: req.body.comercial,
        contacto_fixo: req.body.contacto_fixo,
        descricao1: req.body.descricao1,
        contacto1: req.body.contacto1,
        descricao2: req.body.descricao2,
        contacto2: req.body.contacto2,
        email1: req.body.email1,
		email2: req.body.email2,
        morada: req.body.morada,      
        codigo_postal: req.body.codigo_postal,
        localidade: req.body.localidade,
        nif: req.body.nif, 
        nib1: req.body.nib1, 
        nib2: req.body.nib2, 
        swift: req.body.swift, 
        iban: req.body.iban, 
        observacoes: req.body.observacoes,
        tipo: req.body.tipo,
        updated: new Date(),
        created: new Date(),
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,
    };

	fornecedor.save(fornecedorDetails, {}).then(function(model) {
        res.end('success');
    });
};

exports.update_fornecedor = function (req, res) {
	console.log(req.body.id);

	var fornecedor = new fornecedorItem({id: req.body.id}),
	fornecedorDetails = { 
        nome: req.body.nome,
        comercial: req.body.comercial,
        contacto_fixo: req.body.contacto_fixo,
        descricao1: req.body.descricao1,
        contacto1: req.body.contacto1,
        descricao2: req.body.descricao2,
        contacto2: req.body.contacto2,
        email1: req.body.email1,
		email2: req.body.email2,
        morada: req.body.morada,      
        codigo_postal: req.body.codigo_postal,
        localidade: req.body.localidade,
        nif: req.body.nif, 
        nib1: req.body.nib1, 
        nib2: req.body.nib2, 
        swift: req.body.swift, 
        iban: req.body.iban, 
        observacoes: req.body.observacoes,
        tipo: req.body.tipo,
        updated: new Date(),
        //created: new Date(),
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,
    };

	fornecedor.save(fornecedorDetails, {}).then(function(model) {
        res.end('success');
    });

};

exports.delete_fornecedor = function (req, res) {

	var fornecedor = new fornecedorItem({id: req.body.id});
    fornecedor.destroy({}).then(function(model) {
        res.end('success');
    });

};