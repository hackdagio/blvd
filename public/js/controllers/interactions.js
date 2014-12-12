'use strict';

angular.module('kaizen-concepto.controllers-interactions', ['ui.bootstrap'])

.controller('carouselController', function ($scope) {
  
  $scope.interval = 3000;
  $scope.slides = [
  { image: 'entel/promo/promo_concurso.jpg' },
  { image: 'entel/promo/promo_san-valentin.jpg' },
  { image: 'entel/promo/promo_capacitacion.jpg' }
  ];
})