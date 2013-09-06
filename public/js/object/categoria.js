var categorias;

function categoria() {
    categorias = undefined;
}

categoria.prototype.fetchAll = function ($http) {
    var promise = $http({
        method: 'GET',
        url: '/api_categoria/getall'
    })
        .success(function (data, status, headers, config) {
            console.log("fetchAllCategorias");
            categorias = data.categorias;
            return data.categorias;
        })
        .error(function (data, status, headers, config) {
            return { "status": false };
        });

    return promise;
}

categoria.prototype.getCategorias = function () {
    return categorias;
}

categoria.prototype.getCategoriaById = function (id) {
    for (var i = 0; i < categorias.length; i++) {
        if (categorias[i].id == id)
            return categorias[i];
    }
    return null;
}