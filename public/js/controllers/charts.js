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
      $( function(){

        var responsive_width = '';

        function WidthChange(mq) {
          if (mq.matches) responsive_width = 100;
          else responsive_width = scope.width;
        };

        if (matchMedia) {
          var mq = window.matchMedia( "@media all and (max-width:767px)" );
          mq.addListener(WidthChange);
          WidthChange(mq);
        };


        var data = convert_dates(scope.data, 'Mes', '%Y-%m-%dT%H:%M:%S.%LZ');

        data_graphic({
          data: data,
          height: scope.height,
          width: responsive_width,
          target: element[0],
          x_accessor: 'Mes',
          y_accessor: 'Ponderado',
          animate_on_load: true,
          interpolate: 'basic',
          min_y: 70,
          max_y: 71,
          show_years: true
        });
      });

    }
  };
});