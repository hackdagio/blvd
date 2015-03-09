'use strict';

app.controller('LoginCtrl', ['$scope', '$state', 'authService',
  function ($scope, $state, authService) {
    $scope.loginData = {
      userName: '',
      password: ''
    };

    $scope.alert = {
      type: '',
      msg: ''
    };

    $scope.login = function () {
      authService.login($scope.loginData).then(function (response) {
        $state.go('index');
      },
      function (err) {
        $scope.alert = {
          type: 'danger',
          msg: 'RUT o contraseña incorrectos'
        };
      });
    };
  }
]);


app.controller('RequestCtrl', ['$scope', '$state', 'authService',
  function($scope, $state, authService) {
    $scope.requestData = {
      idUser: ''
    };

    $scope.alert = {
      type: '',
      msg: ''
    };

    $scope.request = function () {
      authService.request($scope.requestData)
      .then(function (response) {
        $scope.alert = {
          type: 'success',
          msg: 'Rut encontrado. Te hemos enviado el correo.'
        };
      },
      function (err) {
        $scope.alert = {
          type: 'danger',
          msg: 'Rut no encontrado'
        };
      });
    };

  }
]);

app.controller('SignupCtrl', ['$scope', '$state', '$stateParams', 'authService',
  function($scope, $state, $stateParams, authService) {

    $scope.signupData = {
      pwd: "",
      pwdConfirmed: ""
    };

    $scope.alert = {
      type: '',
      msg: ''
    };

    $scope.signup = function () {
      authService.signup($scope.signupData, $stateParams.uid, $stateParams.token)
        .then(function (response) {
          $scope.alert = {
            type: 'success',
            msg: 'Contraseña creada con éxito.'
          };
        },
        function (err) {
          $scope.alert = {
            type: 'danger',
            msg: 'Token no válido.'
          };
        });
    };
  }
]);
