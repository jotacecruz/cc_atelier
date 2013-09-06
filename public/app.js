'use strict';

// Declare app level module which depends on filters, and services
var atelier = angular.module('myApp',['$strap.directives','ui.bootstrap','ngGrid','angularFileUpload']).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

      $routeProvider.
      when('/users', {
          templateUrl: 'html/users.htm',
          controller: usersController
      }).
      when('/produtos', {
          templateUrl: 'html/produtos.htm',
          controller: produtosController
          //,resolve: produtosController.resolve
      }).
      when('/encomendas', {
          templateUrl: 'html/encomendas.htm',
          controller: encomendasController
      }).
      when('/obras', {
          templateUrl: 'html/obras.htm',
          controller: obrasController
      }).
      when('/fornecedores', {
          templateUrl: 'html/fornecedores.htm',
          controller: fornecedoresController
      }).
      when('/clientes', {
          templateUrl: 'html/clientes.htm',
          controller: clientesController
      }).
      otherwise({
          templateUrl: 'html/produtos.htm',
          controller: produtosController
          //redirectTo: '/users'
      });

      $locationProvider.html5Mode(true);
  } ]);

atelier.factory("Fornecedores", function ($http) {
    return new fornecedor();
});

atelier.factory("Encomendas", function ($http) {
    return new encomenda();
});

atelier.factory("Obras", function ($http) {
    return new obra();
});

atelier.factory("Categorias", function ($http) {
    return new categoria();
});

atelier.factory("Produtos", function ($http) {
    return new produto();
});

atelier.factory("Clientes", function ($http) {
    return new cliente();
});

atelier.factory("Obras_Produtos", function ($http) {
    return new obras_produtos();
});

atelier.factory("Encomendas_Produtos", function ($http) {
    return new encomendas_produtos();
});

atelier.factory("Valores_Obra", function ($http) {
    return new valores_obra();
});