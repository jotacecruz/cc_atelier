var fornecedores;

function fornecedor() {
    fornecedores = undefined;
}

fornecedor.prototype.fetchAll = function ($http) {
    var promise = $http({
        method: 'GET',
        url: '/api_fornecedor/getall'
        })
        .success(function (data, status, headers, config) {
            console.log("fetchAllFornecedores");
            fornecedores = data.fornecedores;
            return data.fornecedores;
        })
        .error(function (data, status, headers, config) {
            return {"status": false};
        });

    return promise;
}

fornecedor.prototype.getFornecedores = function () {
    return fornecedores;
}

fornecedor.prototype.getFornecedorById = function (id) {
    for (var i = 0; i < fornecedores.length; i++) {
        if (fornecedores[i].id == id)
            return fornecedores[i];
    }
    return null;
}