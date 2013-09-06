'use strict';
//var num_of_keys = Object.keys(data.produtos[0]).length;

function produtosController($scope,$http,$dialog,Fornecedores,Encomendas,Obras,Categorias,Produtos, Clientes,Encomendas_Produtos,Obras_Produtos) {

    $scope.clearAlerts();
    $scope.filterOptions = {
        filterText: ''
    };

    $scope.selected_produto = [];
    $scope.gridProdutos = {
        data: 'produtos',
        selectedItems: $scope.selected_produto,
        multiSelect: false,
        filterOptions: $scope.filterOptions,
        columnDefs: [
            //{field:'id', displayName:'id'},
            {field:'marca', displayName:'marca'},
            {field:'referencia', displayName:'referencia'},
            {field:'categoria', displayName:'categoria'},
            //{field:'id_categorias', displayName:'id_categorias'},
            //{field:'fornecedor', displayName:'fornecedor'},
            //{field:'id_fornecedores', displayName:'id_fornecedores'},
            {field:'descricao', displayName:'descricao'},
            {field:'cor', displayName:'cor'},
            {field:'material', displayName:'material'}
            //{field:'dimensoes', displayName:'dimensoes'},      
            // {field:'stock_total', displayName:'stock_total'},
            // {field:'stock_reservado', displayName:'stock_reservado'},
            // {field:'stock_saida', displayName:'stock_saida'},
            // {field:'preco_base', displayName:'preco_base'},
            // {field:'preco_pvp', displayName:'preco_pvp'},
            // {field:'preco_transporte', displayName:'preco_transporte'},
            // {field:'nome_imagem', displayName:'nome_imagem'},
            // {field:'estado', displayName:'estado'},
            // {field:'pago', displayName:'pago'},
            // {field:'updated', displayName:'updated'},
            // {field:'created', displayName:'created'},
            // {field:'updated_by', displayName:'updated_by'},
            //{field:'created_by', displayName:'created_by'}
        ],
        afterSelectionChange: function () {
            //console.log('$scope.selectedIDs');
            if($scope.selected_produto[0] == undefined)
                return;

            $scope.selectedIDs = [];
            angular.forEach($scope.encomendas_produtos, function ( item ) {
                if(item.id_produtos == $scope.selected_produto[0].id)
                    $scope.selectedIDs.push( item.id_encomendas);
            });

            $scope.filtered_encomendas = $scope.encomendas.filter(function(x) {  
                return $scope.selectedIDs.indexOf(x.id) >= 0
            });

            $scope.selectedIDs = [];
            angular.forEach($scope.obras_produtos, function ( item ) {
                if(item.id_produtos == $scope.selected_produto[0].id)
                    $scope.selectedIDs.push( item.id_obras);
            });

            $scope.filtered_obras = $scope.obras.filter(function(x) { 
                return $scope.selectedIDs.indexOf(x.id) >= 0
            });
        }
    };

    $scope.gridEncomendas = {
        data: 'filtered_encomendas',
        multiSelect: false,
        columnDefs: [
            {field:'numero', displayName:'numero'},
            {field:'fornecedor', displayName:'fornecedor'},
            {field:'data', displayName:'data', cellFilter: 'date:\'yyyy-MM-dd\''},
            {field:'estado', displayName:'estado'}
        ]
    };

    $scope.gridObras = {
        data: 'filtered_obras',
        multiSelect: false,
        columnDefs: [
            {field:'nome', displayName:'nome'},
            {field:'cliente', displayName:'cliente'},     
            {field:'observacoes', displayName:'observacoes'}
        ]
    };    

    //Produtos
    if(Produtos.getProdutos() != undefined){
        $scope.produtos = Produtos.getProdutos();
        $scope.addAlert('success', $scope.produtos.length + ' produtos');
    }

    //Fornecedores
    if(Fornecedores.getFornecedores() != undefined)
        $scope.fornecedores = Fornecedores.getFornecedores();

    //Categorias
    if(Categorias.getCategorias() != undefined)
        $scope.categorias = Categorias.getCategorias();

    //Encomendas
    if(Encomendas.getEncomendas() != undefined)
        $scope.encomendas = Encomendas.getEncomendas();


    if(Encomendas.getEncomendas() == undefined)
    {
        Encomendas.fetchAll($http).then(function(promise) {
            $scope.encomendas = Encomendas.getEncomendas();

            //Fornecedores
            Fornecedores.fetchAll($http).then(function(promise) {
                $scope.fornecedores = Fornecedores.getFornecedores();
                Encomendas.setEncomendasFornecedores($scope.fornecedores);

                //Categorias
                Categorias.fetchAll($http).then(function(promise) {
                    $scope.categorias = Categorias.getCategorias();

                    //Produtos
                    $scope.produtos = Produtos.fetchAll($http).then(function(promise) {
                        Produtos.setProdutosCategorias($scope.categorias);
                        Produtos.setProdutosFornecedores($scope.fornecedores);
                        $scope.produtos = Produtos.getProdutos();
                        $scope.addAlert('success', $scope.produtos.length + ' produtos');
                    });
                });
            });

        });
    }

    //Obras
    if(Obras.getObras() != undefined)
        $scope.obras = Obras.getObras();

    //Clientes
    if(Clientes.getClientes() != undefined)
        $scope.clientes = Clientes.getClientes();
    
    if(Obras.getObras() == undefined)
    {
        Obras.fetchAll($http).then(function(promise) {
            $scope.obras = Obras.getObras();
            //Clientes
            Clientes.fetchAll($http).then(function(promise) {
                $scope.clientes = Clientes.getClientes();
                Obras.setObrasClientes($scope.clientes);
            });            
        });
    }

    //Encomendas_Produtos
    if(Encomendas_Produtos.getEncomendas_Produtos() != undefined)
        $scope.encomendas_produtos = Encomendas_Produtos.getEncomendas_Produtos();
    else
    {
        Encomendas_Produtos.fetchAll($http).then(function(promise) {
            $scope.encomendas_produtos = Encomendas_Produtos.getEncomendas_Produtos();
        });
    }

    //Obras_Produtos
    if(Obras_Produtos.getObras_Produtos() != undefined)
        $scope.obras_produtos = Obras_Produtos.getObras_Produtos();
    else
    {
        Obras_Produtos.fetchAll($http).then(function(promise) {
            $scope.obras_produtos = Obras_Produtos.getObras_Produtos();
        });
    }

    $scope.onFileSelect = function($files) {
        if($scope.selected_produto[0] == undefined)
        {
            alert('deve seleccionar um produto...');
            return;
        }

        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];            
            $http.uploadFile({
                url: "http://" + window.location.host + '/upload',
                file: $file
            }).then(function(data, status, headers, config) {
                // file is uploaded successfully
                //console.log(data.data);
                if($scope.selected_produto[0] != undefined){
                    $scope.selected_produto[0].nome_imagem = data.data;
                    $('#imagem_container').attr('src', data.data);
                }                    
            }); 
        }        
    }
  
  
    $scope.save = function() {
        $scope.clearAlerts();
        //console.log($scope.selected_produto[0]);
        if($scope.selected_produto[0] == null)
        {
            $scope.addAlert('error', 'sem valores..');
            return;
        }

        if($scope.selected_produto[0].id == null) {

            $scope.produtos.push($scope.selected_produto[0]);
            //console.log($scope.selected_produto[0]);

            $http({
            method: 'POST',
            url: '/api_produto/add_produto',
            data: $scope.selected_produto[0]
            })
            .success(function (data, status, headers, config) {
                $scope.addAlert('success', 'ok');
                $scope.produtos = Produtos.fetchAll($http).then(function(promise) {
                    $scope.produtos = Produtos.getProdutos();
                    $scope.addAlert('success', $scope.produtos.length + ' produtos');
                });
            })
            .error(function (data, status, headers, config) {
                $scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
            });
        }
        else
        {

            for(var i in $scope.produtos) {
                if($scope.produtos[i].id == $scope.selected_produto[0].id) {
                    $scope.produtos[i] = $scope.selected_produto[0];
                    //console.log($scope.selected_produto[0]);
                    $http({
                    method: 'POST',
                    url: '/api_produto/update_produto',
                    data: $scope.selected_produto[0]
                    })
                    .success(function (data, status, headers, config) {
                        $scope.clearAlerts();
                        $scope.produtos = Produtos.fetchAll($http).then(function(promise) {
                            $scope.produtos = Produtos.getProdutos();
                            $scope.addAlert('success', $scope.produtos.length + ' produtos');
                        });
                    })
                    .error(function (data, status, headers, config) {
                        $scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
                    });
                }
            }         
        }
        $scope.selected_produto[0] = undefined;
        $('#imagem_container').attr('src','https://cld.pt/dl/thumb/86420f02-48d4-4c08-9da6-abde0c4269a3/no_image.gif?crop=false&amp;size=xl');
        $('.fileupload').fileupload('reset');
    }

    $scope.delete = function (id) {
        for (var i in $scope.produtos) {
            if ($scope.produtos[i].id == id) {
                //console.log($scope.produtos[i]);
                $http({
                method: 'POST',
                url: '/api_produto/delete_produto',
                data: {id: id}
                })
                .success(function (data, status, headers, config) {
                    $scope.clearAlerts();
                    $scope.produtos = Produtos.fetchAll($http).then(function(promise) {
                        $scope.produtos = Produtos.getProdutos();
                        $scope.addAlert('success', $scope.produtos.length + ' produtos');
                    });
                })
                .error(function (data, status, headers, config) {
                    $scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
                });
            }
        }
        $scope.selected_produto[0] = undefined;
        $('#imagem_container').attr('src','https://cld.pt/dl/thumb/86420f02-48d4-4c08-9da6-abde0c4269a3/no_image.gif?crop=false&amp;size=xl');
        $('.fileupload').fileupload('reset');
    }

    $scope.openSaveBox = function(){
        if($scope.selected_produto[0] == undefined){
            alert('Preencha o formulário...');
            return;
        }            

        var title = 'Alerta';
        var msg = 'Confirma querer gravar?';
        var btns = [{result:'cancel', label: 'Não'}, {result:'ok', label: 'Sim', cssClass: 'btn-primary'}];

        $dialog.messageBox(title, msg, btns)
        .open()
        .then(function(result){
            //alert('dialog closed with result: ' + result);
            if(result =='ok')
                $scope.save();
        });
    };

    $scope.openDeleteBox = function(){
        if($scope.selected_produto[0] == undefined){
            alert('Não seleccionou um registo...');
            return;
        }  
        
        if($scope.selected_produto == []){
            alert('Não seleccionou um registo...');
            return;
        }            

        var title = 'Alerta';
        var msg = '';
        if($scope.selected_produto[0].id == null)
            return;
        else
            msg = 'Confirma querer apagar o produto "' + $scope.selected_produto[0].marca + ' - ' + $scope.selected_produto[0].referencia + '"?';

        var btns = [{result:'cancel', label: 'Não'}, {result:'ok', label: 'Sim', cssClass: 'btn-primary'}];

        $dialog.messageBox(title, msg, btns)
        .open()
        .then(function(result){
            //alert('dialog closed with result: ' + result);
            if(result =='ok')
                $scope.delete($scope.selected_produto[0].id);
        });
    };
}

produtosController.resolve = {
    datasets : function($q, $http) {
        var deferred = $q.defer();

        // $http({method: 'GET', url: '/someUrl'})
        // .success(function(data) {
        //     deferred.resolve(data)
        // })
        // .error(function(data){
        //     //actually you'd want deffered.reject(data) here
        //     //but to show what would happen on success..
        //     deferred.resolve("error value");
        // });

        return deferred.promise;
    }
};