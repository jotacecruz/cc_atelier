'use strict';

//1 - honorarios
//2 - contas correntes
//3 - orçamentos

function obrasController($scope, $http, $dialog, Obras, Clientes, Obras_Produtos, Produtos,Valores_Obra) {    
	$scope.clearAlerts();
	$scope.filterOptions = {
		filterText: ''
	}; 
	
	$scope.selected_obra = [];
	$scope.gridObras = {
		data: 'obras',
		selectedItems: $scope.selected_obra,
		multiSelect: false,
		filterOptions: $scope.filterOptions,
		columnDefs: [
			//{field:'id', displayName:'id'},
			{field:'nome', displayName:'nome'},
			//{field:'id_clientes', displayName:'id_clientes'},
			{field:'cliente', displayName:'cliente'},
			//{field:'morada', displayName:'morada'},
			//{field:'codigo_postal', displayName:'codigo_postal'},
			//{field:'localidade', displayName:'localidade'},
			//{field:'orcamento', displayName:'orcamento'},
			//{field:'data_orcamento', displayName:'data_orcamento'},
			//{field:'adjudicado', displayName:'adjudicado'},
			//{field:'data_adjudicado', displayName:'data_adjudicado'},      
			{field:'observacoes', displayName:'observacoes'},
			//{field:'proposta', displayName:'proposta'},
			// {field:'updated', displayName:'updated'},
			// {field:'created', displayName:'created'},
			// {field:'updated_by', displayName:'updated_by'},
			//{field:'created_by', displayName:'created_by'}
		],
		afterSelectionChange: function () {
			if($scope.selected_obra[0] == undefined)
				return;

			$scope.selectedIDs = [];
			angular.forEach($scope.obras_produtos, function (value, key ) {
				if(value.id_obras == $scope.selected_obra[0].id){
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

			$scope.filtered_produtos_obra = $scope.produtos.filter(function(x) { 
				//return x.cor == 'BRANCO'; 
				return $scope.selectedIDs.indexOf(x.id) >= 0;
			});

/**
			$scope.selectedIDsHonorarios = [];
			$scope.selectedIDsContaCorrentes = [];
			$scope.selectedIDsOrcamentos = [];
			angular.forEach($scope.valores_obra, function ( item ) {
				if(item.id_obras == $scope.selected_obra[0].id && item.tipo == 1)
					$scope.selectedIDsHonorarios.push( item.id);
				if(item.id_obras == $scope.selected_obra[0].id && item.tipo == 2)
					$scope.selectedIDsContaCorrentes.push( item.id);
				if(item.id_obras == $scope.selected_obra[0].id && item.tipo == 3)
					$scope.selectedIDsOrcamentos.push( item.id);
			});

			$scope.filtered_honorarios_obra = $scope.valores_obra.filter(function(x) { 
				return $scope.selectedIDsHonorarios.indexOf(x.id) >= 0
			});
			$scope.filtered_ccorrentes_obra = $scope.valores_obra.filter(function(x) { 
				return $scope.selectedIDsContaCorrentes.indexOf(x.id) >= 0
			});
			$scope.filtered_orcamentos_obra = $scope.valores_obra.filter(function(x) { 
				return $scope.selectedIDsOrcamentos.indexOf(x.id) >= 0
			});
*/
		}
	};

	$scope.filterProdutos = {
        filterText: ''
    };
    $scope.selected_produto = [];
	$scope.gridProdutos = {
		data: 'produtos',
		selectedItems: $scope.selected_produto,
        multiSelect: false,
        filterOptions: $scope.filterProdutos,
		columnDefs: [
			{field:'marca', displayName:'marca'},
			{field:'referencia', displayName:'referencia'},
			{field:'categoria', displayName:'categoria'},
			{field:'fornecedor', displayName:'fornecedor'},
		]
	};

	$scope.gridProdutosObra = {
		data: 'filtered_produtos_obra',
		multiSelect: false,
		columnDefs: [
			{field:'marca', displayName:'marca'},
			{field:'referencia', displayName:'referencia'},
			{field:'categoria', displayName:'categoria'},
			{field:'fornecedor', displayName:'fornecedor'},
			{field:'quantidade', displayName:'quantidade'},
		]
	};

	$scope.selected_honorario = [];
  	$scope.gridHonorarios = { 
        data: 'filtered_honorarios_obra',
        selectedItems: $scope.selected_honorario,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        columnDefs: [
        	{field: 'valor', displayName: 'valor', enableCellEdit: true}, 
         	{field:'percentagem', displayName:'percentagem', enableCellEdit: true},
         	{field:'forma_pagamento', displayName:'forma de pagamento', enableCellEdit: true},
         	{field:'data', displayName:'data', enableCellEdit: true},
         	{field:'pago', displayName:'pago', enableCellEdit: true},
         	{field:'factura_emitida', displayName:'factura emitida', enableCellEdit: true},
         	{field:'data_factura', displayName:'data da factura', enableCellEdit: true}
     	]
    };

    $scope.gridContasCorrentes = { 
        data: 'filtered_ccorrentes_obra',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        columnDefs: [
        	{field: 'valor', displayName: 'valor', enableCellEdit: true}, 
         	{field:'percentagem', displayName:'percentagem', enableCellEdit: true},
         	{field:'forma_pagamento', displayName:'forma de pagamento', enableCellEdit: true},
         	{field:'data', displayName:'data', enableCellEdit: true},
         	{field:'pago', displayName:'pago', enableCellEdit: true},
         	{field:'factura_emitida', displayName:'factura emitida', enableCellEdit: true},
         	{field:'data_factura', displayName:'data da factura', enableCellEdit: true}
     	]
    };

    $scope.gridOrcamentos = { 
        data: 'filtered_orcamentos_obra',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        columnDefs: [
        	{field: 'valor', displayName: 'valor', enableCellEdit: true}, 
         	{field:'percentagem', displayName:'percentagem', enableCellEdit: true},
         	{field:'forma_pagamento', displayName:'forma de pagamento', enableCellEdit: true},
         	{field:'data', displayName:'data', enableCellEdit: true},
         	{field:'pago', displayName:'pago', enableCellEdit: true},
         	{field:'factura_emitida', displayName:'factura emitida', enableCellEdit: true},
         	{field:'data_factura', displayName:'data da factura', enableCellEdit: true}
     	]
    };

	//Clientes
  	if(Clientes.getClientes() != undefined)
        $scope.clientes = Clientes.getClientes();

	//Obras_Produtos
    if(Obras_Produtos.getObras_Produtos() != undefined)
        $scope.obras_produtos = Obras_Produtos.getObras_Produtos();

	//Produtos
    if(Produtos.getProdutos() != undefined)
        $scope.produtos = Produtos.getProdutos();

    //Obras
	if(Obras.getObras() != undefined)
        $scope.obras = Obras.getObras();

    //Valores_Obra
    if(Valores_Obra.getValores_Obra() != undefined)
        $scope.valores_obra = Valores_Obra.getValores_Obra();
    else
    {
        Valores_Obra.fetchAll($http).then(function(promise) {
            $scope.valores_obra = Valores_Obra.getValores_Obra();
        });
    }

    $scope.addAlert('success', $scope.obras.length + ' obras');

	$scope.filtered_honorarios_obra = [];
    $scope.addHonorario = function() {
    	$scope.filtered_honorarios_obra.push({valor: 0});
    };

	$scope.save = function() {
		$scope.clearAlerts();
		//console.log($scope.selected_obra[0]);
		if($scope.selected_obra[0] == null)
		{
			$scope.addAlert('error', 'sem valores..');
			return;
		}

		if($scope.selected_obra[0].id == null) {
			//$scope.obras.push($scope.selected_obra[0]);
			Obras.addObra($http, $scope.selected_obra[0]).then(function(promise) {
				console.log(promise);
	            if(promise.status == 200){	            	
			        $scope.obras = Obras.fetchAll($http).then(function(promise) {
			            $scope.obras = Obras.getObras();
			            $scope.addAlert('success', 'adicionada! ' + $scope.obras.length + ' obras');
	        		});
			    }
        	});
		}
		else {
			for(var i in $scope.obras) {
				if($scope.obras[i].id == $scope.selected_obra[0].id) {
					//$scope.obras[i] = $scope.selected_obra[0];
					Obras.updateObra($http, $scope.selected_obra[0]).then(function(promise) {
						console.log(promise);
			            if(promise.status == 200){	            	
					        $scope.obras = Obras.fetchAll($http).then(function(promise) {
					            $scope.obras = Obras.getObras();
					            $scope.addAlert('success', 'actualizada! ' + $scope.obras.length + ' obras');
			        		});
					    }
		        	});
				}
			}         
		}
		$scope.selected_obra[0] = undefined;
	};

	$scope.delete = function(id) {
		Obras.deleteObra($http, id).then(function(promise) {
			console.log(promise);
            if(promise.status == 200){	            	
		        $scope.obras = Obras.fetchAll($http).then(function(promise) {
		            $scope.obras = Obras.getObras();
		            $scope.addAlert('success', 'removida! ' + $scope.obras.length + ' obras');
        		});
		    }
    	});
        $scope.selected_obra[0] = undefined;
    };

	$scope.openSaveBox = function(){
		if($scope.selected_obra[0] == undefined){
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
		if($scope.selected_obra[0] == undefined){
            alert('Não seleccionou um registo...');
            return;
        }  
        
		var title = 'Alerta';
		var msg = '';
		if($scope.selected_obra[0].id == null)
			return;
		else
			msg = 'Confirma querer apagar a obra "' + $scope.selected_obra[0].nome + '"?';

		var btns = [{result:'cancel', label: 'Não'}, {result:'ok', label: 'Sim', cssClass: 'btn-primary'}];

		$dialog.messageBox(title, msg, btns)
			.open()
			.then(function(result){
			//alert('dialog closed with result: ' + result);
			if(result =='ok')
				$scope.delete($scope.selected_obra[0].id);
		});
	};

	$scope.addProdutoBox = function(){
		if($scope.selected_produto[0] == undefined){
            alert('Não seleccionou um registo...');
            return;
        }  
        
		var title = 'Alerta';
		var msg = '';
		if($scope.selected_produto[0].id == null)
			return;
		else
			msg = 'Adicionar produto "' + $scope.selected_produto[0].referencia + '"?';

		var btns = [{result:'cancel', label: 'Não'}, {result:'ok', label: 'Sim', cssClass: 'btn-primary'}];

		$dialog.messageBox(title, msg, btns)
			.open()
			.then(function(result){
			//alert('dialog closed with result: ' + result);
			if(result =='ok')
			{
				
			}
		});
	};
}


