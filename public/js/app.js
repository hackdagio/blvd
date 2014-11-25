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
    controller: 'inicioController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/indicadores', {
    templateUrl: 'partials/indicadores',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/acceder', {
    templateUrl: 'partials/login',
    controller: 'loginController',
    resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/indicadores') }
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


var loginRequired = function($location, $q, authService) {  
    var deferred = $q.defer();

    if(! (authService.authentication.isAuth == true)) {
        deferred.reject()
        $location.path('/acceder');
    } else {
        deferred.resolve()
    }

    return deferred.promise;
}

var redirectIfAuthenticated = function(route) {  
    return function($location, $q, authService) {

        var deferred = $q.defer();

        if (authService.authentication.isAuth == true) {
            deferred.reject()
            $location.path(route);
        } else {
            deferred.resolve()
        }

        return deferred.promise;
    }
}