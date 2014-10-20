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
  controller('usuariosController', function ($scope) {

  }).
  controller('inicioController', function ($scope) {


  });
