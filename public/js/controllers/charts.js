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
      data: '=',
      height: '=',
      width: '='
    },
    link: function(scope, element) {
      
      $(function(){
        var data = convert_dates(scope.data, 'Mes', '%Y-%m-%d');

        data_graphic({
          data: data,
          height: scope.height,
          width: scope.width,
          target: element[0],
          x_accessor: 'Mes',
          y_accessor: 'Ponderado',
          animate_on_load: true,
          interpolate: 'basic',
          min_y: 70,
          max_y: 71
        });
      });
    }
  };
});