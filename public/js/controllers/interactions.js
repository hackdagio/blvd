'use strict';

angular.module('kaizen-concepto.controllers-interactions', ['ui.bootstrap'])

.controller('carouselController', function ($scope) {
  
  $scope.interval = 3000;
  $scope.slides = [
  { image: 'entel/images/carousel1.jpg' },
  { image: 'entel/images/carousel2.jpg' },
  { image: 'entel/images/carousel3.jpg' },
  { image: 'entel/images/carousel4.jpg' }
  ];
})