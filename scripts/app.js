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
  'door3.css',
  'platanus.rut'
]);


var serviceBase = 'http://dev.kaizen.cl/conectados/';

app.constant('ngAuthSettings', {
  apiServiceBaseUri: serviceBase,
  clientId: 'sonrisas'
});


/// Angular routing based on nested views
app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/");
  
  $stateProvider
  
    .state('index', {
      url: '/',
      templateUrl: 'partials/home',
      controller: 'IndexCtrl',
      resolve: { loginRequired: loginRequired },
      css: {
        href: '/stylesheets/partials/indicadores.css',
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
      resolve: { redirectIfAuthenticated: redirectIfAuthenticated('index') }
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
      url: '/signup/confirm/users/:uid/token/:token',
      templateUrl: 'partials/session/signup',
      controller: 'SignupCtrl'
    })

    // Account
    .state('account', {
      url: '/account',
      abstract: true,
      templateUrl: 'partials/account/account',
      resolve: { loginRequired: loginRequired }
    })

    .state('account.general', {
      url: '/general',
      templateUrl: 'partials/account/general',
      controller: 'AccountGeneralCtrl'
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
      templateUrl: 'partials/content/post'
    })


  $locationProvider.html5Mode(true);

});

// Interceptors
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
});

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageType('sessionStorage');
});


app.run(['authService', 
  function (authService) {
    authService.fillAuthData();
  }
]);


var loginRequired = function($state, $q, authService, $timeout) {  

  var deferred = $q.defer();

  if (! (authService.authentication.isAuth)) {
    
    $timeout(function() {
      $state.go('session.login');
    });
    
    deferred.reject();

  } else {
    deferred.resolve();
  }

  return deferred.promise;
};

var redirectIfAuthenticated = function(route) {  
  return function($state, $q, authService, $timeout) {

    var deferred = $q.defer();

    if (authService.authentication.isAuth) {

      $timeout(function() {
        $state.go(route);
      });

      deferred.reject()
      
    } else {
      deferred.resolve()
    }

    return deferred.promise;
  }
};
