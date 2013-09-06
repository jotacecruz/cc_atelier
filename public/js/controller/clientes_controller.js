'use strict';

function clientesController($scope, $http, $dialog, Clientes, Obras) {
	$scope.clearAlerts();
	$scope.filterOptions = {
		filterText: ''
	};    

	$scope.selected_cliente = [];
	$scope.gridClientes = {
		data: 'clientes',
		selectedItems: $scope.selected_cliente,
		multiSelect: false,
		filterOptions: $scope.filterOptions,
		columnDefs: [
			//{field:'id', displayName:'id'},
			{field:'nome', displayName:'nome'},
			//{field:'morada', displayName:'morada'},
			//{field:'codigo_postal', displayName:'codigo_postal'},
			{field:'cidade', displayName:'cidade'},
			{field:'contacto', displayName:'contacto'},
			//{field:'email', displayName:'email'},
			//{field:'nif', displayName:'nif'},
			//{field:'updated', displayName:'updated'},
			//{field:'created', displayName:'created'},
			//{field:'updated_by', displayName:'updated_by'},
			//{field:'created_by', displayName:'created_by'}
		],
        afterSelectionChange: function () {
            if($scope.selected_cliente[0] == undefined)
                return;

            $scope.selectedIDs = [];
            angular.forEach($scope.obras, function ( item ) {
                if(item.id_clientes == $scope.selected_cliente[0].id)
                    $scope.selectedIDs.push( item.id);
            });

            $scope.filtered_obras = $scope.obras.filter(function(x) { 
                return $scope.selectedIDs.indexOf(x.id) >= 0
            });
        }
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

	//Clientes
	if(Clientes.getClientes() != undefined)
        $scope.clientes = Clientes.getClientes();

    //Obras
    if(Obras.getObras() != undefined)
        $scope.obras = Obras.getObras();
    
    $scope.addAlert('success', $scope.clientes.length + ' clientes');

	$scope.save = function() {
		$scope.clearAlerts();
		//console.log($scope.selected_cliente[0]);
		if($scope.selected_cliente[0] == null)
		{
			$scope.addAlert('error', 'sem valores..');
			return;
		}

		if($scope.selected_cliente[0].id == null) {
			$scope.clientes.push($scope.selected_cliente[0]);
			//console.log($scope.selected_cliente[0]);

			$http({
				method: 'POST',
				url: '/api_cliente/add_cliente',
				data: $scope.selected_cliente[0]
			})
			.success(function (data, status, headers, config) {
				$scope.addAlert('success', 'ok');
				$scope.clientes = Clientes.fetchAll($http).then(function(promise) {
					$scope.clientes = Clientes.getClientes();
					$scope.addAlert('success', $scope.clientes.length + ' clientes');
				});
			})
			.error(function (data, status, headers, config) {
				$scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
			});
		}
		else {
			for(var i in $scope.clientes) {
				if($scope.clientes[i].id == $scope.selected_cliente[0].id) {
					$scope.clientes[i] = $scope.selected_cliente[0];
					//console.log($scope.selected_cliente[0]);
					$http({
						method: 'POST',
						url: '/api_cliente/update_cliente',
						data: $scope.selected_cliente[0]
					})
					.success(function (data, status, headers, config) {
						$scope.clearAlerts();
						$scope.clientes = Clientes.fetchAll($http).then(function(promise) {
						$scope.clientes = Clientes.getClientes();
						$scope.addAlert('success', $scope.clientes.length + ' clientes');
					});
					})
					.error(function (data, status, headers, config) {
						$scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
					});
				}
			}         
		}
		$scope.selected_cliente[0] = undefined;
	};

	$scope.delete = function(id) {
        for (var i in $scope.clientes) {
            if ($scope.clientes[i].id == id) {
                //console.log($scope.clientes[i]);
                $http({
                method: 'POST',
                url: '/api_cliente/delete_cliente',
                data: {id: id}
                })
                .success(function (data, status, headers, config) {
                    $scope.clearAlerts();
                    $scope.clientes = Clientes.fetchAll($http).then(function(promise) {
                        $scope.clientes = Clientes.getClientes();
                        $scope.addAlert('success', $scope.clientes.length + ' clientes');
                    });
                })
                .error(function (data, status, headers, config) {
                    $scope.addAlert('error', 'data: ' + data + ' .status: ' + status + ' .headers: ' + headers  + ' .config: ' + config);
                });
            }
        }
        $scope.selected_cliente[0] = undefined;
	};

	$scope.openSaveBox = function(){
		if($scope.selected_cliente[0] == undefined){
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
		if($scope.selected_cliente[0] == undefined){
            alert('Não seleccionou um registo...');
            return;
        }  

		var title = 'Alerta';
		var msg = '';
		if($scope.selected_cliente[0].id == null)
			return;
		else
			msg = 'Confirma querer apagar o cliente "' + $scope.selected_cliente[0].nome + '"?';

		var btns = [{result:'cancel', label: 'Não'}, {result:'ok', label: 'Sim', cssClass: 'btn-primary'}];

		$dialog.messageBox(title, msg, btns)
			.open()
			.then(function(result){
			//alert('dialog closed with result: ' + result);
			if(result =='ok')
				$scope.delete($scope.selected_cliente[0].id);
		});
	};
}

