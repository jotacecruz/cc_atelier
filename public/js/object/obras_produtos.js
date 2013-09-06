var obras_produtos;

function obras_produtos() {
    obras_produtos = undefined;
}

obras_produtos.prototype.fetchAll = function ($http) {
    var promise = $http({
        method: 'GET',
        url: '/api_obras_produtos/getall'
    })
        .success(function (data, status, headers, config) {
            console.log("fetchAllObras_Produtos");
            obras_produtos = data.obras_produtos;
            return data.obras_produtos;
        })
        .error(function (data, status, headers, config) {
            return { "status": false };
        });

    return promise;
}

obras_produtos.prototype.getObras_ProdutosByIdObra = function (id_obras) {
    var to_return = new Array();
    for (var i = 0; i < obras_produtos.length; i++) {
        if (obras_produtos[i].id_obras == id_obras)
            to_return.push(obras_produtos[i]);
    }
    return to_return;
}

obras_produtos.prototype.getObras_Produtos = function () {
    return obras_produtos;
}

obras_produtos.prototype.getObras_ProdutosById = function (id) {
    for (var i = 0; i < obras_produtos.length; i++) {
        if (obras_produtos[i].id == id)
            return obras_produtos[i];
    }
    return null;
}