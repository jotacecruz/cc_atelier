var encomendas;

function encomenda() {
    encomendas = undefined;
}

encomenda.prototype.fetchAll = function ($http) {

    var promise = $http({
        method: 'GET',
        url: '/api_encomenda/getall'
        //,cache: true
    })
    .success(function (data, status, headers, config) {
        console.log("fetchAllEncomendas");
        encomendas = data.encomendas;
        return data.encomendas;
    })
    .error(function (data, status, headers, config) {
        return { "status": false };
    });

    return promise;
}

encomenda.prototype.getEncomendas = function () {
    return encomendas;
}

encomenda.prototype.getEncomendaById = function (id) {
    for (var i = 0; i < encomendas.length; i++) {
        if (encomendas[i].id == id)
            return encomendas[i];
    }
    return null;
}

encomenda.prototype.setEncomendasFornecedores = function (fornecedores) {
    var dict_fornecedores = {};
    $.each(fornecedores, function(key, value) {
        dict_fornecedores[value.id] = value;
    });

    $.each(encomendas, function(key, value) {
        if(value.id_fornecedores > 0 && dict_fornecedores[value.id_fornecedores] != undefined)
            encomendas[key]['fornecedor'] = dict_fornecedores[value.id_fornecedores].nome;
    }); 
}