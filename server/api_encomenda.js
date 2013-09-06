/*
* Serve JSON to our AngularJS client
*/
var my_bd = require('./my_bd');

var encomendaColl = my_bd.Collection.extend({
    tableName: 'cc_encomendas',
    defaults: {        	
        id: '',
        numero: '',
        id_fornecedores: 1,
        id_moradas: 1,
        data: new Date(),
        estado: '',
        observacoes: '',
        numero_factura: '',
        data_factura: new Date(),
        valor: 0,
        forma_pagamento: '',
        data_pagamento: new Date(),
        pago: 0,
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

var encomendaItem = my_bd.Model.extend({
    tableName: 'cc_encomendas',
    defaults: {
        id: '',
        numero: '',
        id_fornecedores: 1,
        id_moradas: 1,
        data: new Date(),
        estado: '',
        observacoes: '',
        numero_factura: '',
        data_factura: new Date(),
        valor: 0,
        forma_pagamento: '',
        data_pagamento: new Date(),
        pago: 0,
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

exports.getall = function (req, res) {

    new encomendaColl().fetch().then(function (result) {
        //console.log(result.toJSON());
        res.json({
            encomendas: result
        });
    });
};

exports.add_encomenda = function (req, res) {
    var encomenda = new encomendaItem(),
	encomendaDetails = { 
        numero: req.body.numero,
        id_fornecedores: req.body.id_fornecedores,
        id_moradas: req.body.id_moradas,
        data: req.body.data,
        estado: req.body.estado,
        observacoes: req.body.observacoes,
        numero_factura: req.body.numero_factura,
        data_factura: req.body.data_factura,
        valor: req.body.valor,
        forma_pagamento: req.body.forma_pagamento,
        data_pagamento: req.body.data_pagamento,
        pago: req.body.pago,
        updated: new Date(),
        created: new Date(),
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,
    };

    encomenda.save(encomendaDetails, {}).then(function(model) {
        res.end('success');
    });
};

exports.update_encomenda = function (req, res) {
    var encomenda = new encomendaItem({ id: req.body.id }),
	encomendaDetails = { 
        numero: req.body.numero,
        id_fornecedores: req.body.id_fornecedores,
        id_moradas: req.body.id_moradas,
        data: req.body.data,
        estado: req.body.estado,
        observacoes: req.body.observacoes,
        numero_factura: req.body.numero_factura,
        data_factura: req.body.data_factura,
        valor: req.body.valor,
        forma_pagamento: req.body.forma_pagamento,
        data_pagamento: req.body.data_pagamento,
        pago: req.body.pago,
        updated: new Date(),
        //created: new Date(),
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,
    };

    encomenda.save(encomendaDetails, {}).then(function(model) {
        res.end('success');
    });
};

exports.delete_encomenda = function (req, res) {

    var encomenda = new encomendaItem({ id: req.body.id });
    encomenda.destroy({}).then(function(model) {
        res.end('success');
    });
};