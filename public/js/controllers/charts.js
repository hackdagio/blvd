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
        data: scope.data,
        height: 300,
        target: element[0],
        x_accessor: "Mes",
        y_accessor: "Ponderado"
      });
    }
  };
});