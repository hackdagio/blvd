/*!
 * Kaizen Dashboard
 * by Ignacio Trujillo <itrujillo@conceptogroup.cl>
 * (c) 2014-2015 Concepto Group
 *
 * http://www.conceptogroup.cl
 * https://github.com/gnaces
 */

'use strict';

var app = angular.module('kaizen-concepto', [
  'kaizen-controllers',
  'kaizen-concepto.controllers-views',
  'ngRoute',
  'LocalStorageModule',
  'angular-loading-bar',
  'ui.bootstrap',
  'ui.radialplot',
  'gaugejs'
]);


// api endpoint
var serviceBase = 'http://demo.kaizen.link/';


// angular routing
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/vp/indicadores', {
    templateUrl: 'partials/vp-indicadores',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/vp/indicadores/allus', {
    templateUrl: 'partials/vp-indicadores-allus',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/vp/indicadores/ecc', {
    templateUrl: 'partials/vp-indicadores-ecc',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/vp/indicadores/sccp', {
    templateUrl: 'partials/vp-indicadores-sccp',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/coordinador/indicadores', {
    templateUrl: 'partials/coordinador-indicadores',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/ejecutivo/indicadores', {
    templateUrl: 'partials/ejecutivo-indicadores',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/supervisor/indicadores', {
    templateUrl: 'partials/supervisor-indicadores',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/me', {
    templateUrl: 'partials/me',
    controller: 'usuarioController',
    resolve: { loginRequired: loginRequired }
  })
  .when('/login', {
    templateUrl: 'partials/login',
    controller: 'loginController',
    resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/vp/indicadores') }
  })
  .when('/first-time', {
    templateUrl: 'partials/first-time',
    controller: 'firsttimeController',
    resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/vp/indicadores') }
  })
  .when('/signup', {
    templateUrl: 'partials/singup',
    controller: 'signupController',
    resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/vp/indicadores') }
  })
  .otherwise({
    redirectTo: '/login'
  });

  $locationProvider.html5Mode(true);
});

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageType('sessionStorage');
});

app.constant('ngAuthSettings', {
  apiServiceBaseUri: serviceBase,
  clientId: 'sonrisas'
});

// interceptors for http requests
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
    $location.path('/login');
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
