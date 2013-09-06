/*
* Serve JSON to our AngularJS client
*/
var my_bd = require('./my_bd');

var valores_obraColl = my_bd.Collection.extend({
    tableName: 'cc_valores_obra',
    defaults: {         
        id_obras: 1,
        tipo: 0,
        documento: '',
        valor: 0,
        percentagem: 0,
        forma_pagamento: '',
        data: new Date(),
        pago: 0,
        factura_emitida: 0,
        data_factura: new Date(),
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

var valores_obraItem = my_bd.Model.extend({
    tableName: 'cc_valores_obra',
    defaults: {
        id_obras: 1,
        tipo: 0,
        documento: '',
        valor: 0,
        percentagem: 0,
        forma_pagamento: '',
        data: new Date(),
        pago: 0,
        factura_emitida: 0,
        data_factura: new Date(),
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

exports.getall = function (req, res) {
    new valores_obraColl().fetch().then(function (result) {
        res.json({
            valores_obra: result
        });
    });
};

exports.add_valores_obra = function (req, res) {
    var valores_obra = new valores_obraItem(),
    valores_obraDetails = {
        id_obras: req.body.id_obras,
        tipo: req.body.tipo,
        documento: req.body.documento,
        valor: req.body.valor,
        percentagem: req.body.percentagem,
        forma_pagamento: req.body.forma_pagamento,
        data: req.body.data,
        pago: req.body.pago,
        factura_emitida: req.body.factura_emitida,
        data_factura: req.body.data_factura,        
        updated: new Date(),
        created: new Date(),
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,
    };

    valores_obra.save(valores_obraDetails, {}).then(function(model) {
        res.end('success');
    });
};

exports.update_valores_obra = function (req, res) {
    var valores_obra = new valores_obraItem({ id: req.body.id }),
    valores_obraDetails = {
        id_obras: req.body.id_obras,
        tipo: req.body.tipo,
        documento: req.body.documento,
        valor: req.body.valor,
        percentagem: req.body.percentagem,
        forma_pagamento: req.body.forma_pagamento,
        data: req.body.data,
        pago: req.body.pago,
        factura_emitida: req.body.factura_emitida,
        data_factura: req.body.data_factura, 
        updated: new Date(),
        //created: new Date(),
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,
    };

    valores_obra.save(valores_obraDetails, {}).then(function(model) {
        res.end('success');
    });

};

exports.delete_valores_obra = function (req, res) {

    var valores_obra = new valores_obraItem({ id: req.body.id });
    valores_obra.destroy({}).then(function(model) {
        res.end('success');
    });

};