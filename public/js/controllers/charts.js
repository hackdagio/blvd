'use strict';
app.controller('historicController', ['$scope', 'indicadoresService', function ($scope, indicadoresService) {

  indicadoresService.getIndicadores('history-all', '').then(function (results) {
    $scope.data = results.data;
  }, function (error) {
    console.log('Error.');
  });

}]);

app.controller('ponderadoController', ['$scope', 'indicadoresService', function ($scope, indicadoresService) {

  indicadoresService.getIndicadores('history', 'general').then(function (results) {
    $scope.data = results.data;
  }, function (error) {
    console.log('Error.');
  });

}]);


app.controller('allusController', ['$scope', 'indicadoresService', function ($scope, indicadoresService) {

  indicadoresService.getIndicadores('history', 'allus').then(function (results) {
    $scope.data = results.data;
  }, function (error) {
    console.log('Error.');
  });

}]);

app.controller('eccController', ['$scope', 'indicadoresService', function ($scope, indicadoresService) {

  indicadoresService.getIndicadores('history', 'ecc').then(function (results) {
    $scope.data = results.data;
  }, function (error) {
    console.log('Error.');
  });

}]);

app.controller('sccpController', ['$scope', 'indicadoresService', function ($scope, indicadoresService) {

  indicadoresService.getIndicadores('history', 'sccp').then(function (results) {
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
      width: '=',
      hasxaxis: '=',
      format: '=',
      extendedticks: '='
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
          min_y_from_data: true,
          area: false,
          x_axis: scope.hasxaxis,
          format: scope.format,
          decimals: 2,
          x_extended_ticks: scope.extendedticks
        });
      });
    }
  };
});

app.directive('metricss', function($http) {
  return {
    restrict: 'E',
    scope: {
      height: '=',
      width: '='
    },
    link: function(scope, element) {

      d3.json('entel/ponderado.json', function(data)  {
        for(var i=0;i<data.length;i++) {
            data[i] = convert_dates(data[i], 'fecha');
        }

        data_graphic({
          data: data,
          height: scope.height,
          width: scope.width,
          target: element[0],
          x_accessor: 'fecha',
          y_accessor: 'value',
          animate_on_load: true,
          linked: true,
          min_y_from_data: true,
          legend: ['Ponderado','EPA','Atención', 'Servicio'],
          legend_target: '.legend',
        });
      });
    }
  };
});