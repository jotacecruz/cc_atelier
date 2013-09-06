var produtos;

function produto() {
    produtos = undefined;
}

produto.prototype.fetchAll = function ($http) {
    var promise = $http({
        method: 'GET',
        url: '/api_produto/getall'
    })
    .success(function (data, status, headers, config) {
        console.log("fetchAllProdutos");
        produtos = data.produtos;
        return data.produtos;
    })
    .error(function (data, status, headers, config) {
        return { "status": false };
    });

    return promise;
}

produto.prototype.getProdutos = function () {
    return produtos;
}

produto.prototype.getProdutoById = function (id) {
    for (var i = 0; i < produtos.length; i++) {
        if (produtos[i].id == id)
            return produtos[i];
    }
    return null;
}

produto.prototype.setProdutosCategorias = function (categorias) {
    var dict_categorias = {};
    $.each(categorias, function(key, value) {
        dict_categorias[value.id] = value;
    });

    $.each(produtos, function(key, value) {
        if(value.id_categorias > 0 && dict_categorias[value.id_categorias] != undefined)
            produtos[key]['categoria'] = dict_categorias[value.id_categorias].descricao;
    }); 
}

produto.prototype.setProdutosFornecedores = function (fornecedores) {
    var dict_fornecedores = {};
    $.each(fornecedores, function(key, value) {
        dict_fornecedores[value.id] = value;
    });

    $.each(produtos, function(key, value) {
        if(value.id_fornecedores > 0 && dict_fornecedores[value.id_fornecedores] != undefined)
            produtos[key]['fornecedor'] = dict_fornecedores[value.id_fornecedores].nome;
    }); 
}