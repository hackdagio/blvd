'use strict';

/* Controllers */

angular.module('kaizen-concepto.controllers', []).

controller('kaizenControllers', function ($scope, $http) {

  $http({
    method: 'GET',
    url: '/api/name'
  }).
  success(function (data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function (data, status, headers, config) {
    $scope.name = 'Error!';
  });

}).

controller('loginController', function ($scope, $http) {

  // hide error messages until submit event
  $scope.submitted = false;

  $scope.showMessage = false;

  $scope.submit = function() {

    $http({
      method: 'post',
      url: 'http://demo.kaizen.link/api/users/login'
    })
    .success(function (data, status, headers, config) {
      $scope.username = data.username;
      $scope.password = data.password;
    })
    .error(function (data, status, headers, config) {
      $scope.data = 'Error';
    })
  };

}).




controller('usuariosController', function ($scope) {

}).
controller('inicioController', function ($scope) {


});
