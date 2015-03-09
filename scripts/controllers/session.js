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

app.controller('SignupCtrl', ['$scope', '$timeout', '$state', '$stateParams', 'authService',
  function($scope, $timeout, $state, $stateParams, authService) {

    $scope.signupData = {
      pwd: "",
      pwdConfirmed: ""
    };

    $scope.alert = {
      type: '',
      msg: ''
    };

    $scope.counter = 0;

    $scope.onTimeout = function () {
      $scope.counter++;
      myTimeout = $timeout($scope.onTimeout, 1000);
    };

    var myTimeout = $timeout($scope.onTimeout, 1000);

    $scope.signup = function () {
      authService.signup($scope.signupData, $stateParams.uid, $stateParams.token)
        .then(function (response) {
          $scope.alert = {
            type: 'success',
            msg: 'Contraseña creada con éxito. En un instante, serás redirigido para que inicies sesión.'
          };

          return $timeout(function () {
            $state.go('session.login', {}, { reload: true });
          }, 5000);

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
