'use strict';

app.controller('LoginCtrl', ['$scope', '$state', 'authService',
  function ($scope, $state, authService) {
    $scope.loginData = {
      userName: "",
      password: ""
    };

    $scope.message = "";

    $scope.login = function () {
      authService.login($scope.loginData).then(function (response) {
        $state.go('index');
      },
      function (err) {
        $scope.message = err.error_description;
      });
    };
  }
]);

app.controller('RequestCtrl', ['$scope', '$state', 'authService',
  function($scope, $state, authService) {
    $scope.requestData = {
      idUser: ""
    };

    $scope.message = "";

    $scope.request = function () {
      authService.request($scope.requestData).then(function (response) {
        $state.go('index');
      },
      function (err) {
        $scope.message = err.Message;
      });
    };

  }
]);

app.controller('SignupCtrl', ['$scope', '$stateParams', 'authService',
  function($scope, $stateParams, authService) {
    $scope.signupData = {
      pwd: "",
      pwdConfirmed: ""
    };

    $scope.message = "";

    $scope.signup = function () {
      authService.signup($scope.signupData, $stateParams.token, $stateParams.uid).then(function (response) {
      },
      function (err) {
        $scope.message = err.Message;
      });
    };

  }
]);