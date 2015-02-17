/*!
 * Boulevard
 * The Kaizen webclient
 * by Ignacio Trujillo <itrujillo@conceptogroup.cl, ignaces@ignac.es>
 * (c) 2015 Concepto Group
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


/// Kaizen Master Endpoint
var serviceBase = 'http://demo.kaizen.link/';


/// Angular routing based on nested views
app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/login");
  
  $stateProvider
  
    .state('home', {
      url: '/',
      templateUrl: 'partials/home',
      controller: 'indicadoresController',
      resolve: { loginRequired: loginRequired }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'partials/login',
      controller: 'loginController',
      resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/') }
    })

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
