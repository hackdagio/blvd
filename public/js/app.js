'use strict';

var app = angular.module('kaizen-concepto', [
  'kaizen-concepto.controllers-views',
  'kaizen-concepto.controllers-interactions',
  'kaizen-concepto.filters',
  'kaizen-concepto.services',
  'kaizen-concepto.directives',
  'ngRoute',
  'LocalStorageModule',
  'angular-loading-bar'
  ]);

app.config(function ($routeProvider, $locationProvider) {

  $routeProvider
  .when('/inicio', {
    templateUrl: 'partials/inicio',
    controller: 'inicioController'
  })
  .when('/indicadores', {
    templateUrl: 'partials/indicadores',
    controller: 'indicadoresController'
  })
  .when('/acceder', {
    templateUrl: 'partials/login',
    controller: 'loginController'
  })
  .otherwise({
    redirectTo: '/acceder'
  });

  $locationProvider.html5Mode(true);
});

var serviceBase = 'http://demo.kaizen.link/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'kaizen'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);
