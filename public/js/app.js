'use strict';

var app = angular.module('kaizen-concepto', [
  'kaizen-concepto.controllers-views',
  'kaizen-concepto.controllers-interactions',
  'kaizen-concepto.filters',
  'kaizen-concepto.services',
  'kaizen-concepto.directives',
  'ngRoute',
  'LocalStorageModule',

  ]);

app.config(function ($routeProvider, $locationProvider) {
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
    controller: 'homeController'
  })
  .when('/inicio', {
    templateUrl: 'partials/inicio',
    controller: 'indexController'
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
