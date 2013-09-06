
/**
 * Module dependencies.
 */

var express = require('express'),
	server = require('./server'),
	api_users = require('./server/api_users'),
	api_fornecedor = require('./server/api_fornecedor'),
    api_encomenda = require('./server/api_encomenda'),
    api_obra = require('./server/api_obra'),
    api_categoria = require('./server/api_categoria'),
    api_cliente = require('./server/api_cliente'),
    api_obras_produtos = require('./server/api_obras_produtos'),
    api_encomendas_produtos = require('./server/api_encomendas_produtos'),
    api_produto = require('./server/api_produto'),
    api_valores_obra = require('./server/api_valores_obra'),
    upload_file = require('./server/upload');

var app = module.exports = express.createServer();


app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

app.get('/api_users/atelier_users', api_users.atelier_users);
app.post('/api_users/update_user', api_users.update_user);
app.post('/api_users/delete_user', api_users.delete_user);
app.post('/api_users/add_user', api_users.add_user);

app.get('/api_fornecedor/getall', api_fornecedor.getall);
app.post('/api_fornecedor/update_fornecedor', api_fornecedor.update_fornecedor);
app.post('/api_fornecedor/delete_fornecedor', api_fornecedor.delete_fornecedor);
app.post('/api_fornecedor/add_fornecedor', api_fornecedor.add_fornecedor);

app.get('/api_encomenda/getall', api_encomenda.getall);
app.post('/api_encomenda/update_encomenda', api_encomenda.update_encomenda);
app.post('/api_encomenda/delete_encomenda', api_encomenda.delete_encomenda);
app.post('/api_encomenda/add_encomenda', api_encomenda.add_encomenda);

app.get('/api_obra/getall', api_obra.getall);
app.post('/api_obra/update_obra', api_obra.update_obra);
app.post('/api_obra/delete_obra', api_obra.delete_obra);
app.post('/api_obra/add_obra', api_obra.add_obra);

app.get('/api_categoria/getall', api_categoria.getall);

app.get('/api_cliente/getall', api_cliente.getall);
app.post('/api_cliente/update_cliente', api_cliente.update_cliente);
app.post('/api_cliente/delete_cliente', api_cliente.delete_cliente);
app.post('/api_cliente/add_cliente', api_cliente.add_cliente);

app.get('/api_obras_produtos/getall', api_obras_produtos.getall);
app.get('/api_encomendas_produtos/getall', api_encomendas_produtos.getall);

app.get('/api_produto/getall', api_produto.getall);
app.post('/api_produto/update_produto', api_produto.update_produto);
app.post('/api_produto/delete_produto', api_produto.delete_produto);
app.post('/api_produto/add_produto', api_produto.add_produto);

app.get('/api_valores_obra/getall', api_valores_obra.getall);
app.post('/api_valores_obra/update_valores_obra', api_valores_obra.update_valores_obra);
app.post('/api_valores_obra/delete_valores_obra', api_valores_obra.delete_valores_obra);
app.post('/api_valores_obra/add_valores_obra', api_valores_obra.add_valores_obra);

app.post('/upload', upload_file.upload);

// redirect all others to the index (HTML5 history)
app.get('*', server.index);
app.get('*/favicon.ico', server.index);//AVOID DOUBLE POST FROM CHROME

// Start server
app.listen(4000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
