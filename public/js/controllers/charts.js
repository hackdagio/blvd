'use strict';
app.controller('historicController', ['$scope', 'indicadoresService', function ($scope, indicadoresService) {

  indicadoresService.getIndicadores('history-all', 'general').then(function (results) {
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

app.directive('metricsgeneral', function() {
  return {
    restrict: 'E',
    scope: {
      height: '=',
      width: '='
    },
    link: function(scope, element) {

      d3.json('entel/ponderado-general.json', function(data)  {
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
          decimals: 2,
          format: 'percentage',
          xax_tick: 0,
        });
      });
    }
  };
});

app.directive('metricsallus', function() {
  return {
    restrict: 'E',
    scope: {
      height: '=',
      width: '='
    },
    link: function(scope, element) {

      d3.json('entel/ponderado-allus.json', function(data)  {
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
          decimals: 2,
          format: 'percentage'
        });
      });
    }
  };
});

app.directive('metricsecc', function() {
  return {
    restrict: 'E',
    scope: {
      height: '=',
      width: '='
    },
    link: function(scope, element) {

      d3.json('entel/ponderado-ecc.json', function(data)  {
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
          decimals: 2,
          format: 'percentage'
        });
      });
    }
  };
});


app.directive('metricssccp', function() {
  return {
    restrict: 'E',
    scope: {
      height: '=',
      width: '='
    },
    link: function(scope, element) {

      d3.json('entel/ponderado-sccp.json', function(data)  {
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
          decimals: 2,
          format: 'percentage'
        });
      });
    }
  };
});

app.controller('PopoverDemoCtrl', function ($scope) {
  $scope.dynamicPopover = 'Hello, World!';
  $scope.dynamicPopoverTitle = 'Title';
});

app.controller('radialPlotCtrl', function($scope) {
  $scope.dataset_a =  [ 
  { id: 0 , name: "Servicio" , value: 30 },
  { id: 1 , name: "Atención" , value: 50 },
  { id: 2 , name: "CROSS" , value: 20 },
  { id: 3 , name: "TMO" , value: 15 },
  { id: 4 , name: "EPA" , value: 55 }
  ];

  $scope.dataset_b =  [ 
  { id: 0 , name: "Servicio" , value: 85 },
  { id: 1 , name: "Atención" , value: 95 },
  { id: 2 , name: "CROSS" , value: 100 },
  { id: 3 , name: "TMO" , value: 50 },
  { id: 4 , name: "EPA" , value: 65 }
  ];
});

app.controller('ProgressDemoCtrl', function ($scope) {
  $scope.max = 100;

  $scope.progressData = [
  97,
  75,
  45,
  21];

  $scope.nameData = [
  'Victoria Subercaseaux',
  'Macarena Ugarte',
  'Pedro Arancibia',
  'Natalia Fuenzalida'];

  $scope.ejecutivosData = [
  'Alicia Valderrama',
  'Javiera Pincheira',
  'Silvana Roloff',
  'María Oyarzo'];

  $scope.ejecutivos2Data = [
  'Alicia Valderrama',
  'María Oyarzo',
  'Sonia Gerke',
  'Alejandro Duarte'];

  $scope.peoresData = [
  'Carolina Riquelme',
  'Pamela Villa',
  'Fernanda Almendra',
  'Javier Torres']
});

app.controller('testGauge', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.animationTime = 10;
    $scope.maxValue = 100;
    $scope.gaugeType = 'donut';

    $scope.valuePonderado = 93.2;
    $scope.valueEPA = 74.5;
    $scope.valueCROSS = 85.4;

    $scope.valuePonderadoSuper = 91.2;
    $scope.valueEPASuper = 82.4;
    $scope.valueCROSSSuper = 89.9;

    $scope.gaugeOptions = {
        lines: 12,
        // The number of lines to draw
        angle: 0.10,
        // The length of each line
        lineWidth: 0.14,
        // The line thickness
        pointer: {
            length: 0.9,
            // The radius of the inner circle
            strokeWidth: 0.035,
            // The rotation offset
            color: '#FFFFFF' // Fill color
        },
        limitMax: 'false',
        // If true, the pointer will not go past the end of the gauge
        colorStart: '#5A5A5A',
        // Colors
        colorStop: '#5A5A5A',
        // just experiment with them
        strokeColor: '#FFAF79',
        // to see which ones work best for you
        generateGradient: true
    };

}]);

app.controller('ModalKpiCtrl', function ($scope, $modal, indicadoresService) {

    // $scope.ranking = [];
    // indicadoresService.getIndicadores('ranking', '').then(function (results) {
    //   $scope.items = results.data;
    // });

  $scope.items = [
  ['98,5', 'AC', 'Francisca Bilbao', 'entel/avatar/30.jpg', '95', '94'], 
  ['95,3', 'SSBV', 'Macarena Suazo', 'entel/avatar/30.jpg', '95', '94'],
  ['44,5', 'BAMCOMER', 'Pablo Aravena', 'entel/avatar/30.jpg', '95', '94'],
  ['57,4', 'NURSERY', 'Diego Deza', 'entel/avatar/30.jpg', '95', '94'],
  ['68,9', 'SMPH', 'Agustina Ugarte', 'entel/avatar/30.jpg', '95', '94'],
  ['84,2', 'OT', 'Camila Flores', 'entel/avatar/30.jpg', '95', '94']
  ];
  $scope.kpi = ['Nivel de Servicio', 'Nivel de Atención', 'EPA', 'TMO', 'Desviación de llamadas'];

  $scope.open = function (size, kpiname) {

    var modalInstance = $modal.open({
      templateUrl: 'partials/modal-kpi',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        },
        centros: function () {
          return $scope.centros;
        },
        kpi: function () {
          return $scope.kpi;
        },
        title: function () {
          return kpiname;
        }
      }
    });

  };

});

app.controller('ModalHabCtrl', function ($scope, $modal, indicadoresService) {

    // $scope.ranking = [];
    // indicadoresService.getIndicadores('ranking', '').then(function (results) {
    //   $scope.items = results.data;
    // });

  $scope.kpi = ['Servicio', 'Atención', 'Desviación', 'EPA', 'TMO', 'CROSS'];
  $scope.items = [
  ['94,2'],
  ['75,4'],
  ['67,4'],
  ['98,5'],
  ['94,3'],
  ['87,3']
  ];

  $scope.open = function (size, kpiname) {

    var modalInstance = $modal.open({
      templateUrl: 'partials/modal-hab',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        },
        centros: function () {
          return $scope.centros;
        },
        kpi: function () {
          return $scope.kpi;
        },
        title: function () {
          return kpiname;
        }
      }
    });

  };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, title, centros, kpi) {

  $scope.title = title;
  $scope.centros = centros;
  $scope.kpi = kpi;
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
