/*
* Serve JSON to our AngularJS client
*/
var my_bd = require('./my_bd');

var categoriaColl = my_bd.Collection.extend({
    tableName: 'cc_categorias',
    defaults: {
        id_categorias: 1,
        descricao: '',
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

var categoriaItem = my_bd.Model.extend({
    tableName: 'cc_categorias',
    defaults: {
        id_categorias: 1,
        descricao: '',
        updated: new Date(),
        created: new Date(),
        updated_by: 'sistema',
        created_by: 'sistema'
    }
});

exports.getall = function (req, res) {

    new categoriaColl().fetch().then(function (result) {
        //console.log(result.toJSON());
        res.json({
            categorias: result
        });
    });
};

exports.add_categoria = function (req, res) {

    var categoria = new categoriaItem(),
	categoriaDetails = { id_categorias: req.body.id_categorias, descricao: req.body.descricao };

    categoria.save(categoriaDetails, {
        success: function (categoria) {
            console.log('success');
        },
        error: function (error) {
            console.log('error');
        }
    });
};

exports.update_categoria = function (req, res) {
    console.log(req.body.id);

    var categoria = new categoriaItem({ id: req.body.id }),
	categoriaDetails = { id_categorias: req.body.id_categorias, descricao: req.body.descricao };

    categoria.save(categoriaDetails, {
        success: function (categoria) {
            console.log('success');
        },
        error: function (error) {
            console.log('error');
        }
    });

};

exports.delete_categoria = function (req, res) {

    var categoria = new categoriaItem({ id: req.body.id });
    categoria.destroy({
        success: function (categoria) {
            console.log('success');
        },
        error: function (error) {
            console.log('error');
        }
    });

};