'use strict';

app.factory('authService', ['$http', '$timeout', '$q', 'localStorageService', 
  function ($http, $timeout, $q, localStorageService) {
    
    var authServiceFactory = {};
    var _authentication = {
      isAuth: false,
      profile: ''
    };
 
    var _login = function (loginData) {

      var data = 'grant_type=password&username=' + loginData.username + '&password=' + loginData.password;

      return $http.post(serviceBase + 'token', data).
        success(function (response) {

          var personaData = { 
            id: response.username,
            display_name: response.display_name,
            email: response.email,
            phone: response.phone,
            firstname: response.firstname,
            middlename: response.middlename,
            surname: response.surname,
            lastname: response.lastname,
            profile: response.profile
          };

          localStorageService.set('authorizationData', { token: response.access_token, profile: response.profile });
          localStorageService.set('personaData', personaData);
          _authentication.isAuth = true;
          _authentication.profile =  response.profile;

          return response;
        }).
        error(function(err) {
          return null;
        });
    };

    // Request signup

    var _requestSignup = function (requestData) {

      return $http.post(serviceBase + 'users/' + requestData.idUser + '/signup', '').
        success(function (response) {
          return response;
        }).
        error(function(err) {
          return null;
        });
    };

    // Signup

    var _signup = function (signupData, uid, token) {

      var data = { 'password': signupData.pwdConfirmed, 'token': token }; 

      return $http.post(serviceBase + 'users/' + uid, data).
        success(function (response) {
          return response;
        }).
        error(function(err) {
          return null;
        });
    };

    var _logOut = function () {

      localStorageService.remove('authorizationData');
      localStorageService.clearAll();
      _authentication.isAuth = false;

    };

    var _fillAuthData = function () {

      var authData = localStorageService.get('authorizationData');
      if (authData) {
        _authentication.isAuth = true;
        _authentication.profile = authData.profile;
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


app.factory('localService', ['localStorageService',
  function(localStorageService) {

    var localServiceFactory = {};

    var _getinfo = function(key) {
      return localStorageService.get(key);
    };

    localServiceFactory.getinfo = _getinfo;

    return localServiceFactory;
  }
]);