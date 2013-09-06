var obras;

function obra() {
    obras = undefined;
}

obra.prototype.fetchAll = function ($http) {
    var promise = $http({
        method: 'GET',
        url: '/api_obra/getall'
    })
    .success(function (data, status, headers, config) {
        console.log("fetchAllObras");
        obras = data.obras;
        return data.obras;
    })
    .error(function (data, status, headers, config) {
        return { "status": false };
    });

    return promise;
}

obra.prototype.getObras = function () {
    return obras;
}

obra.prototype.getObraById = function (id) {
    for (var i = 0; i < obras.length; i++) {
        if (obras[i].id == id)
            return obras[i];
    }
    return null;
}

obra.prototype.addObra = function ($http, obra_to_add) {
    var promise = $http({
        method: 'POST',
        url: '/api_obra/add_obra',
        data: obra_to_add
    })
    .success(function (data, status, headers, config) {
    })
    .error(function (data, status, headers, config) {
    });

    return promise;
}

obra.prototype.updateObra = function ($http, obra_to_update) {
    var promise = $http({
        method: 'POST',
        url: '/api_obra/update_obra',
        data: obra_to_update
    })
    .success(function (data, status, headers, config) {
    })
    .error(function (data, status, headers, config) {
    });

    return promise;
}

obra.prototype.deleteObra = function ($http, id_obra) {
    var promise = $http({
        method: 'POST',
        url: '/api_obra/delete_obra',
        data: {id: id_obra}
    })
    .success(function (data, status, headers, config) {
    })
    .error(function (data, status, headers, config) {
    });

    return promise;
}

obra.prototype.setObrasClientes = function (clientes) {
    var dict_clientes = {};
    $.each(clientes, function(key, value) {
        dict_clientes[value.id] = value;
    });

    $.each(obras, function(key, value) {
        if(value.id_clientes > 0 && dict_clientes[value.id_clientes] != undefined)
            obras[key]['cliente'] = dict_clientes[value.id_clientes].nome;
    }); 
}