'use strict';

function fornecedoresController($scope, $http, $dialog, Fornecedores, Encomendas) {
	$scope.clearAlerts();
	$scope.filterOptions = {
		filterText: ''
	};    

	$scope.selected_fornecedor = [];
	$scope.gridFornecedores = {
		data: 'fornecedores',
		selectedItems: $scope.selected_fornecedor,
		multiSelect: false,
		filterOptions: $scope.filterOptions,
		columnDefs: [
			//{field:'id', displayName:'id'},
			{field:'nome', displayName:'nome'},
			{field:'comercial', displayName:'comercial'},
			{field:'contacto_fixo', displayName:'contacto_fixo'},
			//{field:'descricao1', displayName:'descricao1'},
			{field:'contacto1', displayName:'contacto1'},
			//{field:'descricao2', displayName:'descricao2'},
			{field:'contacto2', displayName:'contacto2'},
			//{field:'email1', displayName:'email1'},
			//{field:'email2', displayName:'email2'},
			//{field:'morada', displayName:'morada'},
			//{field:'codigo_postal', displayName:'codigo_postal'},
			//{field:'localidade', displayName:'localidade'},
			//{field:'nif', displayName:'nif'},
			//{field:'nib1', displayName:'nib1'},
			//{field:'nib2', displayName:'nib2'},
			//{field:'swift', displayName:'swift'},
			//{field:'iban', displayName:'iban'},
			//{field:'observacoes', displayName:'observacoes'},
			//{field:'tipo', displayName:'tipo'},
			//{field:'updated', displayName:'updated'},
			//{field:'created', displayName:'created'},
			//{field:'updated_by', displayName:'updated_by'},
			//{field:'created_by', displayName:'created_by'}
		],
		afterSelectionChange: function () {
			if($scope.selected_fornecedor[0] == undefined)
				return;

			$scope.selectedIDs = [];
			angular.forEach($scope.encomendas, function ( item ) {
				if(item.id_fornecedores == $scope.selected_fornecedor[0].id)
					$scope.selectedIDs.push( item.id);
			});

			$scope.filtered_encomendas = $scope.encomendas.filter(function(x) { 
			return $scope.selectedIDs.indexOf(x.id) >= 0
			});
		}
	};

	$scope.gridEncomendas = {
      data: 'filtered_encomendas',
      selectedItems: $scope.selected_encomenda,
      multiSelect: false,
      columnDefs: [
          {field:'numero', displayName:'numero'},
          {field:'data', displayName:'data', cellFilter: 'date:\'yyyy-MM-dd\''},
          {field:'estado', displayName:'estado'},
      ]
    };

    //Encomendas
    if(Encomendas.getEncomendas() != undefined)
        $scope.encomendas = Encomendas.getEncomendas();

    //Fornecedores
	if(Fornecedores.getFornecedores() != undefined)
    	$scope.fornecedores = Fornecedores.getFornecedores();

	$scope.addAlert('success', $scope.fornecedores.length + ' fornecedores');

	$scope.save = function() {
		$scope.clearAlerts();
		if($scope.selected_fornecedor[0] == null)
		{
			$scope.addAlert('error', 'sem valores..');
			return;
		}

		if($scope.selected_fornecedor[0].id == null) {
			$scope.fornecedores.push($scope.selected_fornecedor[0]);
			//console.log($scope.selected_fornecedor[0]);

			$http({
				method: 'POST',
				url: '/api_fornecedor/add_fornecedor',
				data: $scope.selected_fornecedor[0]
			})
			.success(function (data, status, headers, config) {
				$scope.addAlert('success', 'ok');
				$scope.fornecedores = Fornecedores.fetchAll($http).then(function(promise) {
					$scope.fornecedores = Fornecedores.getFornecedores();
					$scope.addAlert('success', $scope.fornecedores.length + ' fornecedores');
				});
			})
			.error(function (data, status, headers, config) {
				$scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
			});
		}
		else {
			for(var i in $scope.fornecedores) {
				if($scope.fornecedores[i].id == $scope.selected_fornecedor[0].id) {
					$scope.fornecedores[i] = $scope.selected_fornecedor[0];
					//console.log($scope.selected_fornecedor[0]);
					$http({
						method: 'POST',
						url: '/api_fornecedor/update_fornecedor',
						data: $scope.selected_fornecedor[0]
					})
					.success(function (data, status, headers, config) {
						$scope.clearAlerts();
						$scope.fornecedores = Fornecedores.fetchAll($http).then(function(promise) {
						$scope.fornecedores = Fornecedores.getFornecedores();
						$scope.addAlert('success', $scope.fornecedores.length + ' fornecedores');
					});
					})
					.error(function (data, status, headers, config) {
						$scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
					});
				}
			}         
		}
		$scope.selected_fornecedor[0] = undefined;
	};

	$scope.delete = function(id) {
        for (var i in $scope.fornecedores) {
            if ($scope.fornecedores[i].id == id) {
                //console.log($scope.fornecedores[i]);
                $http({
                method: 'POST',
                url: '/api_fornecedor/delete_fornecedor',
                data: {id: id}
                })
                .success(function (data, status, headers, config) {
                    $scope.clearAlerts();
                    $scope.fornecedores = Fornecedores.fetchAll($http).then(function(promise) {
                        $scope.fornecedores = Fornecedores.getFornecedores();
                        $scope.addAlert('success', $scope.fornecedores.length + ' fornecedores');
                    });
                })
                .error(function (data, status, headers, config) {
                    $scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
                });
            }
        }
        $scope.selected_fornecedor[0] = undefined;
    };

	$scope.openSaveBox = function(){
		if($scope.selected_fornecedor[0] == undefined){
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
		if($scope.selected_fornecedor[0] == undefined){
            alert('Não seleccionou um registo...');
            return;
        }  
        
		var title = 'Alerta';
		var msg = '';
		if($scope.selected_fornecedor[0].id == null)
			return;
		else
			msg = 'Confirma querer apagar o fornecedor "' + $scope.selected_fornecedor[0].nome + '"?';

		var btns = [{result:'cancel', label: 'Não'}, {result:'ok', label: 'Sim', cssClass: 'btn-primary'}];

		$dialog.messageBox(title, msg, btns)
			.open()
			.then(function(result){
			//alert('dialog closed with result: ' + result);
			if(result =='ok')
				$scope.delete($scope.selected_fornecedor[0].id);
		});
	};
}

