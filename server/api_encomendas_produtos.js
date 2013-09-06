/*
* Serve JSON to our AngularJS client
*/
var my_bd = require('./my_bd');

var encomendas_produtosColl = my_bd.Collection.extend({
    tableName: 'cc_encomendas_produtos',
    defaults: {      	
        id_obras: 0,
        id_produtos: 0,
        quantidade: 0,
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

var encomendas_produtosItem = my_bd.Model.extend({
    tableName: 'cc_encomendas_produtos',
    defaults: {
        id_obras: 0,
        id_produtos: 0,
        quantidade: 0,
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

exports.getall = function (req, res) {

    new encomendas_produtosColl().fetch().then(function (result) {
        //console.log(result.toJSON());
        res.json({
            encomendas_produtos: result
        });
    });
};

exports.add_encomendas_produtos = function (req, res) {

    var encomendas_produtos = new encomendas_produtosItem(),
	encomendas_produtosDetails = { nome: req.body.nome, morada: req.body.morada };

    encomendas_produtos.save(encomendas_produtosDetails, {
        success: function (encomendas_produtos) {
            console.log('success');
        },
        error: function (error) {
            console.log('error');
        }
    });
};

exports.update_encomendas_produtos = function (req, res) {
    console.log(req.body.id);

    var encomendas_produtos = new encomendas_produtosItem({ id: req.body.id }),
	encomendas_produtosDetails = { nome: req.body.nome, morada: req.body.morada };

    encomendas_produtos.save(encomendas_produtosDetails, {
        success: function (encomendas_produtos) {
            console.log('success');
        },
        error: function (error) {
            console.log('error');
        }
    });

};

exports.delete_encomendas_produtos = function (req, res) {

    var encomendas_produtos = new encomendas_produtosItem({ id: req.body.id });
    encomendas_produtos.destroy({
        success: function (encomendas_produtos) {
            console.log('success');
        },
        error: function (error) {
            console.log('error');
        }
    });

};