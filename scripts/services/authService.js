'use strict';

app.factory('authService', ['$http', '$q', 'localStorageService', 
  function ($http, $q, localStorageService) {
    
    var authServiceFactory = {};
    var _authentication = {
      isAuth: false,
      userName : ""
    };
 
    var _login = function (loginData) {

      var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
      var deferred = $q.defer();

      $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        
      .success(function (response) {
        
        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
        _authentication.isAuth = true;
        _authentication.userName = loginData.userName;

        deferred.resolve(response);

      })
      .error(function (err, status) {

        _logOut();
        deferred.reject(err);

      });

      return deferred.promise;

    };

    var _requestSignup = function (requestData) {

      var data = "";
      var deferred = $q.defer();      

      $http.post(serviceBase + 'users/' + requestData.idUser + '/signup', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .success(function (response) {

        deferred.resolve(response);

      })
      .error(function(err, status) {

        deferred.reject(err);

      });

      return deferred.promise;

    };

    // Signup

    var _signup = function (signupData, uid, token) {

      var data = { 'password': signupData.pwdConfirmed, 'token': token };
      var deferred = $q.defer();      

      $http.post(serviceBase + 'users/' + uid, data)
      .success(function (response) {

        deferred.resolve(response);

      })
      .error(function(err, status) {

        deferred.reject(err);

      });

      return deferred.promise;

    };

    var _logOut = function () {

      localStorageService.remove('authorizationData');
      localStorageService.clearAll();
      _authentication.isAuth = false;
      _authentication.userName = "";

    };

    var _fillAuthData = function () {

      var authData = localStorageService.get('authorizationData');
      if (authData) {
        _authentication.isAuth = true;
        _authentication.userName = authData.userName;
      }

    };
 
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.request = _requestSignup;
    authServiceFactory.signup = _signup;
 
    return authServiceFactory;
  }
]);