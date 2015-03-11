'use strict';

app.factory('authService', ['$http', '$q', 'localStorageService', 
  function ($http, $q, localStorageService) {
    
    var authServiceFactory = {};
    var _authentication = {
      isAuth: false,
      userName : ""
    };
 
    var _login = function (loginData) {

      var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password;

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
            lastname: response.lastname
          };

          localStorageService.set('authorizationData', { token: response.access_token });
          localStorageService.set('personaData', personaData);
          _authentication.isAuth = true;
          _authentication.userName = response.username;

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