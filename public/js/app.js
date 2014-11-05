'use strict';

angular.module('kaizen-concepto', [
  'kaizen-concepto.controllers-views',
  'kaizen-concepto.controllers-interactions',
  'kaizen-concepto.filters',
  'kaizen-concepto.services',
  'kaizen-concepto.directives'
  ])

.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/acceder', {
    templateUrl: 'partials/login',
    controller: 'loginController'
  })
  .when('/concursos', {
    templateUrl: 'partials/concursos',
    controller: 'concursosController'
  })
  .when('/usuarios', {
    templateUrl: 'partials/usuarios',
    controller: 'usuariosController'
  })
  .when('/inicio', {
    templateUrl: 'partials/inicio',
    controller: 'inicioController'
  })
  .when('/indicadores', {
    templateUrl: 'partials/indicadores',
    controller: 'indicadoresController'
  })
  .otherwise({
    redirectTo: '/inicio'
  });

  $locationProvider.html5Mode(true);
});
