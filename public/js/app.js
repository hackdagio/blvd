'use strict';

// Declare app level module which depends on filters, and services

angular.module('kaizen-concepto', [
  'kaizen-concepto.controllers',
  'kaizen-concepto.filters',
  'kaizen-concepto.services',
  'kaizen-concepto.directives'
  ])

.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/login', {
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
    redirectTo: '/login'
  });

  $locationProvider.html5Mode(true);
});
