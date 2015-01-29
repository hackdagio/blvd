'use strict';

angular.module('kaizen-controllers', ['ui.bootstrap'])

	.controller('navbarController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
		$scope.logOut = function () {
			authService.logOut();
			$location.path('/');
    }

    $scope.authentication = authService.authentication;
  }])

  .controller('bannerController', ['$scope', function ($scope) {
  	$scope.interval = 3000;
  	$scope.slides = [
  	  { image: '//static.kaizen.link/entel/promos/promo_concurso.jpg' },
  	  { image: '//static.kaizen.link/entel/promos/promo_san-valentin.jpg' },
  	  { image: '//static.kaizen.link/entel/promos/promo_capacitacion.jpg' }
  	];
  }])