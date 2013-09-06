'use strict';
//var num_of_keys = Object.keys(data.produtos[0]).length;


function encomendasController($scope, $http, $dialog,Encomendas, Fornecedores, Produtos, Encomendas_Produtos, Categorias) {    
    $scope.clearAlerts();
    $scope.filterOptions = {
        filterText: ''
    };

    $scope.selected_encomenda = [];
    $scope.gridEncomendas = {
        data: 'encomendas',
        selectedItems: $scope.selected_encomenda,
        multiSelect: false,
        filterOptions: $scope.filterOptions,
        columnDefs: [
            //{field:'id', displayName:'id'},
            {field:'numero', displayName:'numero'},
            {field:'fornecedor', displayName:'fornecedor'},
            //{field:'id_fornecedores', displayName:'id_fornecedores'},
            {field:'data', displayName:'data', cellFilter: 'date:\'yyyy-MM-dd\''},
            {field:'estado', displayName:'estado'},
            //{field:'observacoes', displayName:'observacoes'},
            //{field:'numero_factura', displayName:'numero_factura'},
            //{field:'valor', displayName:'valor'},      
            // {field:'forma_pagamento', displayName:'forma_pagamento'},
            // {field:'data_pagamento', displayName:'data_pagamento'},
            // {field:'pago', displayName:'pago'},
            // {field:'updated', displayName:'updated'},
            // {field:'created', displayName:'created'},
            // {field:'updated_by', displayName:'updated_by'},
            //{field:'created_by', displayName:'created_by'}
        ],
        afterSelectionChange: function () {
            console.log('$scope.selectedIDs');
            if($scope.selected_encomenda[0] == undefined)
                return;

            $scope.selectedIDs = [];
            angular.forEach($scope.encomendas_produtos, function ( value, key ) {
                if(value.id_encomendas == $scope.selected_encomenda[0].id)
                {
                    var current_produto_index = 0;
                    var current_produto = $scope.produtos.filter(function(x) {
                        if(x.id == value.id_produtos)
                            current_produto_index = $scope.produtos.indexOf(x);
                    });
                    if(current_produto_index > 0){
                        $scope.produtos[current_produto_index]['quantidade'] = value.quantidade;
                        $scope.selectedIDs.push(value.id_produtos);
                    }
                }
            });

            $scope.filtered_produtos = $scope.produtos.filter(function(x) { 
                return $scope.selectedIDs.indexOf(x.id) >= 0
            });
        }
    };

    $scope.gridProdutos = {
        data: 'filtered_produtos',
        selectedItems: $scope.selected_produto,
        multiSelect: false,
        columnDefs: [
            {field:'marca', displayName:'marca'},
            {field:'referencia', displayName:'referencia'},
            {field:'categoria', displayName:'categoria'},
            {field:'fornecedor', displayName:'fornecedor'},
            {field:'quantidade', displayName:'quantidade'},
        ]
    };

    //Fornecedores
    if(Fornecedores.getFornecedores() != undefined)
        $scope.fornecedores = Fornecedores.getFornecedores();

    //Produtos
    if(Produtos.getProdutos() != undefined)
        $scope.produtos = Produtos.getProdutos();

    //Encomendas_Produtos
    if(Encomendas_Produtos.getEncomendas_Produtos() != undefined)
        $scope.encomendas_produtos = Encomendas_Produtos.getEncomendas_Produtos();

    //Encomendas
    if(Encomendas.getEncomendas() != undefined)
        $scope.encomendas = Encomendas.getEncomendas();

    $scope.addAlert('success', $scope.encomendas.length + ' encomendas');

    $scope.save = function() {
        $scope.clearAlerts();
        if($scope.selected_encomenda[0] == null)
        {
            $scope.addAlert('error', 'sem valores..');
            return;
        }

        if($scope.selected_encomenda[0].id == null) {
            $scope.encomendas.push($scope.selected_encomenda[0]);

            $http({
                method: 'POST',
                url: '/api_encomenda/add_encomenda',
                data: $scope.selected_encomenda[0]
            })
            .success(function (data, status, headers, config) {
                $scope.addAlert('success', 'ok');
                $scope.encomendas = Encomendas.fetchAll($http).then(function(promise) {
                    $scope.encomendas = Encomendas.getEncomendas();
                    scope.addAlert('success', $scope.encomendas.length + ' encomendas');
                });
            })
            .error(function (data, status, headers, config) {
                $scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
            });
        }
        else {
            for(var i in $scope.encomendas) {
                if($scope.encomendas[i].id == $scope.selected_encomenda[0].id) {
                    $scope.encomendas[i] = $scope.selected_encomenda[0];

                    $http({
                        method: 'POST',
                        url: '/api_encomenda/update_encomenda',
                        data: $scope.selected_encomenda[0]
                    })
                    .success(function (data, status, headers, config) {
                        $scope.clearAlerts();
                        $scope.encomendas = Encomendas.fetchAll($http).then(function(promise) {
                            $scope.encomendas = Encomendas.getEncomendas();
                            $scope.addAlert('success', $scope.encomendas.length + ' encomendas');
                        });
                    })
                    .error(function (data, status, headers, config) {
                        $scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
                    });
                }
            }         
        }
        $scope.selected_encomenda[0] = undefined;
    };

    $scope.delete = function(id) {
        for (var i in $scope.encomendas) {
            if ($scope.encomendas[i].id == id) {
                //console.log($scope.encomendas[i]);
                $http({
                method: 'POST',
                url: '/api_encomenda/delete_encomenda',
                data: {id: id}
                })
                .success(function (data, status, headers, config) {
                    $scope.clearAlerts();
                    $scope.encomendas = Encomendas.fetchAll($http).then(function(promise) {
                        $scope.encomendas = Encomendas.getEncomendas();
                        $scope.addAlert('success', $scope.encomendas.length + ' encomendas');
                    });
                })
                .error(function (data, status, headers, config) {
                    $scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
                });
            }
        }
        $scope.selected_encomenda[0] = undefined;
    };

    $scope.openSaveBox = function(){
        if($scope.selected_encomenda[0] == undefined){
            alert('Preencha o formulário...');
            return;
        } 

        var title = 'Alerta';
        var msg = 'Confirma querer gravar?';
        var btns = [{result:'cancel', label: 'Não'}, {result:'ok', label: 'Sim', cssClass: 'btn-primary'}];

        $dialog.messageBox(title, msg, btns)
        .open()
        .then(function(result){
            if(result =='ok')
                $scope.save();
        });
    };

    $scope.openDeleteBox = function(){
        if($scope.selected_encomenda[0] == undefined){
            alert('Não seleccionou um registo...');
            return;
        }  
        
        var title = 'Alerta';
        var msg = '';
        if($scope.selected_encomenda[0].id == null)
            return;
        else
            msg = 'Confirma querer apagar a encomenda "' + $scope.selected_encomenda[0].numero + '"?';

        var btns = [{result:'cancel', label: 'Não'}, {result:'ok', label: 'Sim', cssClass: 'btn-primary'}];

        $dialog.messageBox(title, msg, btns)
        .open()
        .then(function(result){
            //alert('dialog closed with result: ' + result);
            if(result =='ok')
                $scope.delete($scope.selected_encomenda[0].id);
        });
        };
}