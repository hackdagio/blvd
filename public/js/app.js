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
  .when('/usuarios', {
    templateUrl: 'partials/usuarios',
    controller: 'usuariosController'
  })
  .when('/inicio', {
    templateUrl: 'partials/inicio',
    controller: 'inicioController'
  })
  .otherwise({
    redirectTo: '/inicio'
  });

  $locationProvider.html5Mode(true);
});
