'use strict';

/*
** Login Controller
*/

app.controller('loginController', ['$scope', '$location', 'authService', 
  function ($scope, $location, authService) {

    $scope.loginData = {
      userName: "",
      password: ""
    };

    $scope.message = "";

    $scope.login = function () {
      authService.login($scope.loginData).then(function (response) {
        $location.path('/');
      },
      function (err) {
        $scope.message = err.error_description;
      });
    };
  }
]);

app.controller('navbarController', ['$scope', '$state', 'authService',
  function ($scope, $state, authService) {

    $scope.logOut = function () {
      authService.logOut();
      $state.go('session.login');
    };

    $scope.authentication = authService.authentication;
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