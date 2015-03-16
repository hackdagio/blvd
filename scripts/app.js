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
  'angular-loading-bar',
  'ui.router',
  'LocalStorageModule',
  'ui.bootstrap',
  'ui.radialplot',
  'gaugejs',
  'door3.css',
  'ngAnimate'
]);

var serviceBase = 'http://dev.kaizen.cl/conectados/';

/// Angular routing based on nested views
app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
  
    .state('index', {
      url: '/',
      templateProvider: function (authService, $http, $templateCache) {
        var auth = authService.authentication;
        var templateUrl;
        var templateBase = '/partials/profiles/';

        if (auth.profile === 'VP') {
          templateUrl = templateBase + 'tp/vp';
        } else if (auth.profile === 'Ejecutivo') {
          templateUrl = templateBase + 'tp/ejecutivo';
        } else if (auth.profile === 'Supervisor') {
          templateUrl = templateBase + 'tp/supervisor';
        } else if (auth.profile === 'Coordinador') {
          templateUrl = templateBase + 'tp/coordinador';
        } else {
          templateUrl = null;
        }

        var tpl = $templateCache.get(templateUrl);
        if (tpl) return tpl;

        return $http.get(templateUrl).
        then(function(response) {
          tpl = response.data;
          $templateCache.put(templateUrl, tpl);
          return tpl;
        });
      },
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

    // .state('session.login.forgot', {
    //   url: '/forgot',
    //   onEnter: ['$state', '$modal', '$scope',
    //     function($state, $modal, $scope) {
    //       $modal.open({
    //         templateUrl: 'partials/session/forgot',
    //         controller: 'ForgotPwdCtrl'
    //       }).result.finally(function() {
    //         $state.go('^');
    //       });
    //       $scope.ok = function() {
    //         $modal.close();
    //       }
    //     }
    //   ],  
    // })

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
      url: '/post/:id',
      templateUrl: 'partials/content/post'
    })


  $locationProvider.html5Mode(true);

}]);

app.constant('ngAuthSettings', {
  apiServiceBaseUri: serviceBase,
  clientId: 'sonrisas'
});

// Interceptors
app.config(['$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
  }
]);

app.config(['localStorageServiceProvider',
  function (localStorageServiceProvider) {
    localStorageServiceProvider.setStorageType('sessionStorage');
  }
]);

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
