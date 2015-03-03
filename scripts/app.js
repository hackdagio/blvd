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

var app = angular.module('boulevard', [
  'kaizen-concepto.controllers-views',
  'ui.router',
  'LocalStorageModule',
  'angular-loading-bar',
  'ui.bootstrap',
  'ui.radialplot',
  'gaugejs',
  'door3.css'
]);


/// Kaizen Master Endpoint
app.constant('ngAuthSettings', {
  apiServiceBaseUri: serviceBase,
  clientId: 'sonrisas'
});

var serviceBase = 'http://localhost:49717/conectados/';


/// Angular routing based on nested views
app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/");
  
  $stateProvider
  
    .state('index', {
      url: '/',
      templateUrl: 'partials/home',
      controller: 'indicadoresController',
      resolve: { loginRequired: loginRequired },
      css: {
        href: '/stylesheets/indicadores.css',
        container: 'head',
        bustCache: true,
        preload: true
      }
    })

    // Session

    .state('session', {
      url: '/session',
      abstract: true,
      templateUrl: 'partials/session/session',
      resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/') }
    })

    .state('session.login', {
      url: '/login',
      templateUrl: 'partials/session/login',
      controller: 'LoginCtrl'
    })

    .state('session.request', {
      url: '/request',
      templateUrl: 'partials/session/request',
      controller: 'RequestCtrl'
    })

    .state('session.signup', {
      url: '/signup',
      templateUrl: 'partials/session/signup',
      controller: 'signupCtrl'
    })

    .state('session.signup.confirm', {
      url: '/confirm?uid&token'
    })

    // Account

    .state('account', {
      url: '/account',
      abstract: true,
      templateUrl: 'partials/account/account'
    })

    .state('account.general', {
      url: '/general',
      templateUrl: 'partials/account/general'
    })

    .state('account.user', {
      url: '/user',
      templateUrl: 'partials/account/user'
    })

    .state('account.security', {
      url: '/security',
      templateUrl: 'partials/account/security'
    })

    .state('account.help', {
      url: '/help',
      templateUrl: 'partials/account/help'
    })

    // Post

    .state('content', {
      url: '/content',
      abstract: true,
      templateUrl: 'partials/content/content',
      resolve: { loginRequired: loginRequired }
    })

    .state('content.post', {
      url: '/post',
      templateUrl: 'partials/content/post',
      css: {
        href: '/stylesheets/post.css',
        container: 'head',
        bustCache: true,
        preload: true
      }
    })


  $locationProvider.html5Mode(true);

});

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageType('sessionStorage');
});

// Interceptors
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
  authService.fillAuthData();
}]);


// checking ac

var loginRequired = function($location, $q, authService) {  
  
  var deferred = $q.defer();

  if(! (authService.authentication.isAuth == true)) {
    deferred.reject()
    $location.path('/session/login');
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
