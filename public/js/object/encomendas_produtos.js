var encomendas_produtos;

function encomendas_produtos() {
    encomendas_produtos = undefined;
}

encomendas_produtos.prototype.fetchAll = function ($http) {
    var promise = $http({
        method: 'GET',
        url: '/api_encomendas_produtos/getall'
    })
        .success(function (data, status, headers, config) {
            console.log("fetchAllEncomendas_Produtos");
            encomendas_produtos = data.encomendas_produtos;
            return data.encomendas_produtos;
        })
        .error(function (data, status, headers, config) {
            return { "status": false };
        });

    return promise;
}

encomendas_produtos.prototype.getEncomendas_Produtos = function () {
    return encomendas_produtos;
}

encomendas_produtos.prototype.getEncomendas_ProdutosByIdEncomenda = function (id_encomendas) {
    var to_return = new Array();
    for (var i = 0; i < encomendas_produtos.length; i++) {
        if (encomendas_produtos[i].id_encomendas == id_encomendas)
            to_return.push(encomendas_produtos[i]);
    }
    return to_return;
}

encomendas_produtos.prototype.getEncomendas_ProdutosById = function (id) {
    for (var i = 0; i < encomendas_produtos.length; i++) {
        if (encomendas_produtos[i].id == id)
            return encomendas_produtos[i];
    }
    return null;
}