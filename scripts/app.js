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
  'ui.router',
  'LocalStorageModule',
  'angular-loading-bar',
  'ui.bootstrap',
  'ui.radialplot',
  'gaugejs'
]);


// api endpoint
var serviceBase = 'http://demo.kaizen.link/';


// angular routing
app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");
  $stateProvider
  .state('vp/indicadores', {
    url: '/vp/indicadores',
    templateUrl: 'partials/vp-indicadores',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  // .state('/vp/indicadores/allus', {
  //   url: ''
  //   templateUrl: 'partials/vp-indicadores-allus',
  //   controller: 'indicadoresController',
  //   resolve: { loginRequired: loginRequired }
  // })
  // .state('/vp/indicadores/ecc', {
  //   templateUrl: 'partials/vp-indicadores-ecc',
  //   controller: 'indicadoresController',
  //   resolve: { loginRequired: loginRequired }
  // })
  // .state('/vp/indicadores/sccp', {
  //   templateUrl: 'partials/vp-indicadores-sccp',
  //   controller: 'indicadoresController',
  //   resolve: { loginRequired: loginRequired }
  // })
  .state('coordinador/indicadores', {
    url: '/coordinador/indicadores',
    templateUrl: 'partials/coordinador-indicadores',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .state('ejecutivo/indicadores', {
    url: '/ejecutivo/indicadores',
    templateUrl: 'partials/ejecutivo-indicadores',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .state('supervisor/indicadores', {
    url: '/supervisor/indicadores',
    templateUrl: 'partials/supervisor-indicadores',
    controller: 'indicadoresController',
    resolve: { loginRequired: loginRequired }
  })
  .state('me', {
    url: '/me',
    templateUrl: 'partials/me',
    controller: 'usuarioController',
    resolve: { loginRequired: loginRequired }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'partials/login',
    controller: 'loginController',
    resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/vp/indicadores') }
  })
  .state('first-time', {
    url: '/first-time',
    templateUrl: 'partials/first-time',
    controller: 'firsttimeController',
    resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/vp/indicadores') }
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'partials/singup',
    controller: 'signupController',
    resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/vp/indicadores') }
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
