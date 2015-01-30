'use strict';

app.controller('loginController', ['$scope', '$state', 'authService', function ($scope, $state, authService) {
  $scope.loginData = {
    userName: "",
    password: ""
  };

  $scope.message = "";

  $scope.login = function () {
    authService.login($scope.loginData).then(function (response) {
      $state.go('vp/indicadores');
    },
    function (err) {
      $scope.message = err.error_description;
    });
  };
}]);