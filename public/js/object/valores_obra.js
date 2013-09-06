var valores_obras;

function valores_obra() {
    valores_obras = undefined;
}

valores_obra.prototype.fetchAll = function ($http) {
    var promise = $http({
        method: 'GET',
        url: '/api_valores_obra/getall'
    })    
    .success(function (data, status, headers, config) {
        console.log("fetchAllValores_Obras" + data.valores_obra);
        valores_obras = data.valores_obra;
        return data.valores_obras;
    })
    .error(function (data, status, headers, config) {
        return { "status": false };
    });

    return promise;
}

valores_obra.prototype.getValores_ObraByIdObra = function (id_obras) {
    var to_return = new Array();
    for (var i = 0; i < valores_obras.length; i++) {
        if (valores_obras[i].id_obras == id_obras)
            to_return.push(valores_obras[i]);
    }
    return to_return;
}

valores_obra.prototype.getValores_Obra = function () {
    return valores_obras;
}

valores_obra.prototype.getValores_ObraById = function (id) {
    for (var i = 0; i < valores_obras.length; i++) {
        if (valores_obras[i].id == id)
            return valores_obras[i];
    }
    return null;
}

