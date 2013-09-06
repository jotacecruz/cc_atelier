/*
* Serve JSON to our AngularJS client
*/
var my_bd = require('./my_bd');

var obras_produtosColl = my_bd.Collection.extend({
    tableName: 'cc_obras_produtos',
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

var obras_produtosItem = my_bd.Model.extend({
    tableName: 'cc_obras_produtos',
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

    new obras_produtosColl().fetch().then(function (result) {
        //console.log(result.toJSON());
        res.json({
            obras_produtos: result
        });
    });
};

exports.add_obras_produtos = function (req, res) {

    var obras_produtos = new obras_produtosItem(),
	obras_produtosDetails = { 
        id_obras: req.body.id_obras == undefined ? 0 : req.body.id_obras,
        id_produtos: req.body.id_produtos == undefined ? 0 : req.body.id_produtos,
        quantidade: req.body.quantidade == undefined ? 0 : req.body.quantidade,
    };

    obras_produtos.save(obras_produtosDetails, {
        success: function (obras_produtos) {
            console.log('success');
        },
        error: function (error) {
            console.log('error');
        }
    });
};

exports.update_obras_produtos = function (req, res) {
    console.log(req.body.id);

    var obras_produtos = new obras_produtosItem({ id: req.body.id }),
	obras_produtosDetails = { nome: req.body.nome, morada: req.body.morada };

    obras_produtos.save(obras_produtosDetails, {
        success: function (obras_produtos) {
            console.log('success');
        },
        error: function (error) {
            console.log('error');
        }
    });

};

exports.delete_obras_produtos = function (req, res) {

    var obras_produtos = new obras_produtosItem({ id: req.body.id });
    obras_produtos.destroy({
        success: function (obras_produtos) {
            console.log('success');
        },
        error: function (error) {
            console.log('error');
        }
    });

};