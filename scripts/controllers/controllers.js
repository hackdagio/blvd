'use strict';

app.controller('LoginCtrl', ['$scope', '$state', 'authService',
  function ($scope, $state, authService) {
    $scope.loginData = {
      username: '',
      password: ''
    };

    $scope.alert = {type: '', msg: ''};

    $scope.login = function () {
      authService.login($scope.loginData).
        then(function (response) {
          $state.go('index', {}, {reload: true});
        }, function (err) {
          $scope.alert = {
            type: 'danger',
            msg: 'No puedes ingresar'
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

    $scope.alert = {type: '',msg: ''};

    $scope.request = function () {
      authService.request($scope.requestData).
        then(function (response) {
          $scope.alert = {
            type: 'success',
            msg: 'Rut encontrado. Te hemos enviado el correo.'
          };
        }, function (err) {
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

    $scope.alert = {type: '',msg: ''};

    $scope.signup = function () {
      authService.signup($scope.signupData, $stateParams.uid, $stateParams.token).
        then(function (response) {
          $scope.alert = {
            type: 'success',
            msg: 'Contraseña creada con éxito. En un instante, serás redirigido para que inicies sesión.'
          };

          return $timeout(function () {
            $state.go('session.login', {}, { reload: true });
          }, 5000);
        }, function (err) {
          $scope.alert = {
            type: 'danger',
            msg: 'Token no válido.'
          };
        });
      };
  }
]);

app.controller('AccountGeneralCtrl', ['$scope', 'localService',
  function($scope, localService) {

    var d = localService.getinfo('personaData');

    $scope.PersonaInfo = {
      id: d.id,
      givenname: d.firstname + ' ' + d.middlename,
      surname: d.surname + ' ' + d.lastname,
      displayname: d.display_name,
      email: d.email,
      phone: d.phone
    };

  }
]);

app.controller('NavbarCtrl', ['$rootScope', '$scope', '$state', 'localService', 'authService',
  function ($rootScope, $scope, $state, localService, authService) {

    $rootScope.$on('$stateChangeStart', function (event, next) {
      $scope.personaData = localService.getinfo('personaData');
    });
    
    $scope.authentication = authService.authentication;
    $scope.personaData = localService.getinfo('personaData');

    $scope.logOut = function () {
      authService.logOut();
      $state.go('session.login');
    };
  }
]);

app.controller('bannerController', ['$scope', 
  function ($scope) {
    $scope.interval = 3000;
    $scope.slides = [
      { image: '//static.kaizen.link/entel/promos/promo_concurso.jpg' },
     { image: '//static.kaizen.link/entel/promos/promo_san-valentin.jpg' },
     { image: '//static.kaizen.link/entel/promos/promo_capacitacion.jpg' }
    ];
  }
]);

app.controller('IndexCtrl', ['$scope', 'localService',
  function($scope, localService) {
    $scope.personaData = localService.getinfo('personaData');
  }
]);