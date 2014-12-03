'use strict';
app.controller('ponderadoController', ['$scope', 'indicadoresService', function ($scope, indicadoresService) {

  indicadoresService.getIndicadores('history', 'general').then(function (results) {
    $scope.data = results.data;
  }, function (error) {
    console.log('Error.');
  });

}]);

app.directive('metrics', function($http) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function(scope, element) {

      data_graphic({
        title: "UFO Sightings",
        description: "Yearly UFO sightings from 1945 to 2010.",
        data: scope.data,
        width: 400,
        height: 250,
        target: element[0],
        x_accessor: "Mes",
        y_accessor: "Ponderado",
        interpolate: "monotone"
      });
    }
  };
});