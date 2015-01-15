'use strict';

var app = angular.module('kaizen-concepto', [
  'kaizen-concepto.controllers-views',
  'kaizen-concepto.controllers-interactions',
  'ngRoute',
  'LocalStorageModule',
  'angular-loading-bar',
  'ui.bootstrap',
  'ui.radialplot',
  'gaugejs'
  ]);

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
  .when('/acceder', {
    templateUrl: 'partials/login',
    controller: 'loginController',
    resolve: { redirectIfAuthenticated: redirectIfAuthenticated('/vp/indicadores') }
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


app.factory('signalRHubProxy', ['$rootScope', 'signalRServer', 
    function ($rootScope, signalRServer) {
        function signalRHubProxyFactory(serverUrl, hubName, startOptions) {
            var connection = $.hubConnection(signalRServer);
            var proxy = connection.createHubProxy(hubName);
            connection.start(startOptions).done(function () { });
            
            return {
                on: function (eventName, callback) {
                    proxy.on(eventName, function (result) {
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback(result);
                            }
                        });
                    });
                },
                off: function (eventName, callback) {
                    proxy.off(eventName, function (result) {
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback(result);
                            }
                        });
                    });
                },
                invoke: function (methodName, callback) {
                    proxy.invoke(methodName)
                        .done(function (result) {
                            $rootScope.$apply(function () {
                                if (callback) {
                                    callback(result);
                                }
                            });
                        });
                },
                connection: connection
            };
        };

        return signalRHubProxyFactory;    
}]);
