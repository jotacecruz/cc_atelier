/*
* Serve JSON to our AngularJS client
*/
var my_bd = require('./my_bd');

var obraColl = my_bd.Collection.extend({
    tableName: 'cc_obras',
    defaults: {      	
        nome: '',
        id_clientes: 1,
        morada: '',
        codigo_postal: '',
        localidade: '',
        orcamento: 0,
        data_orcamento: new Date(),
        adjudicado: 0,
        data_adjudicado: new Date(),
        adjudicado_pagamento: '',
        observacoes: '',
        proposta: '',
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

var obraItem = my_bd.Model.extend({
    tableName: 'cc_obras',
    defaults: {
        nome: '',
        id_clientes: 1,
        morada: '',
        codigo_postal: '',
        localidade: '',
        orcamento: 0,
        data_orcamento: new Date(),
        adjudicado: 0,
        data_adjudicado: new Date(),
        adjudicado_pagamento: '',
        observacoes: '',
        proposta: '',
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

exports.getall = function (req, res) {

    new obraColl().fetch().then(function (result) {
        //console.log(result.toJSON());
        res.json({
            obras: result
        });
    });
};

exports.add_obra = function (req, res) {
    console.log(req.body);
    var obra = new obraItem(),
	obraDetails = { 
        nome: req.body.nome == undefined ? '' : req.body.nome,
        id_clientes: req.body.id_clientes == undefined ? 1 : req.body.id_clientes,
        morada: req.body.morada == undefined ? '' : req.body.morada,      
        codigo_postal: req.body.codigo_postal == undefined ? '' : req.body.codigo_postal,
        localidade: req.body.localidade == undefined ? '' : req.body.localidade,
        proposta: req.body.proposta == undefined ? '' : req.body.proposta,
        orcamento: req.body.orcamento == undefined ? 0 : req.body.orcamento,
        data_orcamento: req.body.data_orcamento == undefined ? new Date() : req.body.data_orcamento,
        adjudicado: req.body.adjudicado == undefined ? 0 : req.body.adjudicado,
        data_adjudicado: req.body.data_adjudicado == undefined ? new Date() : req.body.data_adjudicado,
        adjudicado_pagamento: req.body.adjudicado_pagamento == undefined ? '' : req.body.adjudicado_pagamento,
        observacoes: req.body.observacoes == undefined ? '' : req.body.observacoes,
        updated: new Date(),
        created: new Date()
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,

    };

    obra.save(obraDetails, {}).then(function(model) {
        res.end('success');
    });
};

exports.update_obra = function (req, res) {
    console.log(req.body.id);

    var obra = new obraItem({ id: req.body.id }),
	obraDetails = { 
        nome: req.body.nome == undefined ? '' : req.body.nome,
        id_clientes: req.body.id_clientes == undefined ? 1 : req.body.id_clientes,
        morada: req.body.morada == undefined ? '' : req.body.morada,      
        codigo_postal: req.body.codigo_postal == undefined ? '' : req.body.codigo_postal,
        localidade: req.body.localidade == undefined ? '' : req.body.localidade,
        proposta: req.body.proposta == undefined ? '' : req.body.proposta,
        orcamento: req.body.orcamento == undefined ? 0 : req.body.orcamento,
        data_orcamento: req.body.data_orcamento == undefined ? new Date() : req.body.data_orcamento,
        adjudicado: req.body.adjudicado == undefined ? 0 : req.body.adjudicado,
        data_adjudicado: req.body.data_adjudicado == undefined ? new Date() : req.body.data_adjudicado,
        adjudicado_pagamento: req.body.adjudicado_pagamento == undefined ? '' : req.body.adjudicado_pagamento,
        observacoes: req.body.observacoes == undefined ? '' : req.body.observacoes,
        updated: new Date()
        //created: new Date(),
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,

    };

    obra.save(obraDetails, {}).then(function(model) {
        res.end('success');
    });

};

exports.delete_obra = function (req, res) {

    var obra = new obraItem({ id: req.body.id });
    obra.destroy({}).then(function(model) {
        res.end('success');
    });

};