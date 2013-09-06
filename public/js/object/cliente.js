var clientes;

function cliente() {
    clientes = undefined;
}

cliente.prototype.fetchAll = function ($http) {
    var promise = $http({
        method: 'GET',
        url: '/api_cliente/getall'
    })
        .success(function (data, status, headers, config) {
            console.log("fetchAllClientes");
            clientes = data.clientes;
            return data.clientes;
        })
        .error(function (data, status, headers, config) {
            return { "status": false };
        });

    return promise;
}

cliente.prototype.getClientes = function () {
    return clientes;
}

cliente.prototype.getClienteById = function (id) {
    for (var i = 0; i < clientes.length; i++) {
        if (clientes[i].id == id)
            return clientes[i];
    }
    return null;
}