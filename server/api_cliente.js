/*
* Serve JSON to our AngularJS client
*/
var my_bd = require('./my_bd');

var clienteColl = my_bd.Collection.extend({
    tableName: 'cc_clientes',
    defaults: {      	
        nome: '',
        morada: '',
        codigo_postal: '',
        cidade: '',
        contacto: '',
        email: '',
        nif: '',
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

var clienteItem = my_bd.Model.extend({
    tableName: 'cc_clientes',
    defaults: {
        nome: '',
        morada: '',
        codigo_postal: '',
        cidade: '',
        contacto: '',
        email: '',
        nif: '',
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

exports.getall = function (req, res) {

    new clienteColl().fetch().then(function (result) {
        //console.log(result.toJSON());
        res.json({
            clientes: result
        });
    });
};

exports.add_cliente = function (req, res) {
    var cliente = new clienteItem(),
	clienteDetails = {
        nome: req.body.nome,
        morada: req.body.morada,      
        codigo_postal: req.body.codigo_postal,
        cidade: req.body.cidade,
        contacto: req.body.contacto,
        email: req.body.email,
        nif: req.body.nif,
        updated: new Date(),
        created: new Date(),
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,
    };

    cliente.save(clienteDetails, {}).then(function(model) {
        res.end('success');
    });
};

exports.update_cliente = function (req, res) {
    var cliente = new clienteItem({ id: req.body.id }),
	clienteDetails = {
        nome: req.body.nome,
        morada: req.body.morada,      
        codigo_postal: req.body.codigo_postal,
        cidade: req.body.cidade,
        contacto: req.body.contacto,
        email: req.body.email,
        nif: req.body.nif,
        updated: new Date(),
        //created: new Date(),
        // updated_by: req.body.updated_by,
        // created_by: req.body.created_by,
    };

    cliente.save(clienteDetails, {}).then(function(model) {
        res.end('success');
    });

};

exports.delete_cliente = function (req, res) {

    var cliente = new clienteItem({ id: req.body.id });
    cliente.destroy({}).then(function(model) {
        res.end('success');
    });

};