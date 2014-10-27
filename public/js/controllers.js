'use strict';

/* Controllers */

angular.module('kaizen-concepto.controllers', ['ui.bootstrap', 'n3-line-chart', 'n3-pie-chart'])

// I provide a request-transformation method that is used to prepare the outgoing
// request as a FORM post instead of a JSON packet.

.factory("transformRequestAsFormPost", function() {
  // I prepare the request data for the form post.
  function transformRequest( data, getHeaders ) {
    var headers = getHeaders();
    headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
    return( serializeData( data ) );
  }

  // Return the factory value.
  return( transformRequest );

  // ---
  // PPRIVATE METHODS
  // ---

  // I serialize the given Object into a key-value pair string. This
  // method expects an object and will default to the toString() method.
  // --
  // NOTE: This is an atered version of the jQuery.param() method which
  // will serialize a data collection for Form posting.
  // --
  // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45

  function serializeData( data ) {

    // If this is not an object, defer to native stringification.
    if ( ! angular.isObject( data ) ) {
      return( ( data == null ) ? "" : data.toString() );
    }
    var buffer = [];

    // Serialize each key in the object.
    for ( var name in data ) {
      if ( ! data.hasOwnProperty( name ) ) {
        continue;
      }
      var value = data[ name ];
      buffer.push(
        encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value )
        );
    }

    // Serialize the buffer and clean it up for transportation.
    var source = buffer.join( "&" ).replace( /%20/g, "+" );
    return( source );
  }
})

.controller('kaizenControllers', function ($scope, $http) {

  $http({
    method: 'GET',
    url: '/api/name'
  }).
  success(function (data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function (data, status, headers, config) {
    $scope.name = 'Error!';
  });

})

.controller('loginController', function ($scope, $http, transformRequestAsFormPost) {

  // hide error messages until submit event
  $scope.submitted = false;

  $scope.showMessage = false;

  $scope.submit = function() {

    $http({
      method: 'post',
      url: 'http://demo.kaizen.link/api/users/login',
      transformRequest: transformRequestAsFormPost,
    })
    .success(function (data, status, headers, config) {
      $scope.username = data.username;
      $scope.password = data.password;
    })
    .error(function (data, status, headers, config) {
      $scope.data = 'Error';
    })
  };

})

.controller('usuariosController', function ($scope) {

})

.controller('inicioController', function ($scope) {

})


.controller('carouselController', function ($scope) {
  $scope.interval = 3000;
  $scope.slides = [
  {
    image: 'demo/carousel/1.jpg'
  },
  {
    image: 'demo/carousel/2.jpg'
  },
  {
    image: 'demo/carousel/3.jpg'
  },
  {
    image: 'demo/carousel/4.jpg'
  }
  ];
})


.controller('kpichartsController', function ($scope) {
  $scope.data = [
  {x: 0, val_0: 0, val_1: 0, val_2: 0, val_3: 0},
  {x: 1, val_0: 0.993, val_1: 3.894, val_2: 8.47, val_3: 14.347},
  {x: 2, val_0: 1.947, val_1: 7.174, val_2: 13.981, val_3: 19.991},
  {x: 3, val_0: 2.823, val_1: 9.32, val_2: 14.608, val_3: 13.509},
  {x: 4, val_0: 3.587, val_1: 9.996, val_2: 10.132, val_3: -1.167},
  {x: 5, val_0: 4.207, val_1: 9.093, val_2: 2.117, val_3: -15.136},
  {x: 6, val_0: 4.66, val_1: 6.755, val_2: -6.638, val_3: -19.923},
  {x: 7, val_0: 4.927, val_1: 3.35, val_2: -13.074, val_3: -12.625},
  {x: 8, val_0: 4.998, val_1: -0.584, val_2: -14.942, val_3: 2.331},
  {x: 9, val_0: 4.869, val_1: -4.425, val_2: -11.591, val_3: 15.873},
  {x: 10, val_0: 4.546, val_1: -7.568, val_2: -4.191, val_3: 19.787},
  {x: 11, val_0: 4.042, val_1: -9.516, val_2: 4.673, val_3: 11.698},
  {x: 12, val_0: 3.377, val_1: -9.962, val_2: 11.905, val_3: -3.487},
  {x: 13, val_0: 0, val_1: 0, val_2: 0, val_3: 0},
  {x: 14, val_0: 0.993, val_1: 3.894, val_2: 8.47, val_3: 14.347},
  {x: 15, val_0: 1.947, val_1: 7.174, val_2: 13.981, val_3: 19.991},
  {x: 16, val_0: 2.823, val_1: 9.32, val_2: 14.608, val_3: 13.509},
  {x: 17, val_0: 3.587, val_1: 9.996, val_2: 10.132, val_3: -1.167},
  {x: 18, val_0: 4.207, val_1: 9.093, val_2: 2.117, val_3: -15.136},
  {x: 19, val_0: 4.66, val_1: 6.755, val_2: -6.638, val_3: -19.923},
  {x: 20, val_0: 4.927, val_1: 3.35, val_2: -13.074, val_3: -12.625},
  {x: 21, val_0: 4.998, val_1: -0.584, val_2: -14.942, val_3: 2.331},
  {x: 22, val_0: 4.869, val_1: -4.425, val_2: -11.591, val_3: 15.873},
  {x: 23, val_0: 4.546, val_1: -7.568, val_2: -4.191, val_3: 19.787},
  {x: 24, val_0: 4.042, val_1: -9.516, val_2: 4.673, val_3: 11.698},
  {x: 25, val_0: 3.377, val_1: -9.962, val_2: 11.905, val_3: -3.487},
  {x: 26, val_0: 4.927, val_1: 3.35, val_2: -13.074, val_3: -12.625},
  {x: 27, val_0: 4.998, val_1: -0.584, val_2: -14.942, val_3: 2.331},
  {x: 28, val_0: 4.869, val_1: -4.425, val_2: -11.591, val_3: 15.873},
  {x: 29, val_0: 4.546, val_1: -7.568, val_2: -4.191, val_3: 19.787},
  {x: 30, val_0: 4.042, val_1: -9.516, val_2: 4.673, val_3: 11.698},
  {x: 31, val_0: 3.377, val_1: -9.962, val_2: 11.905, val_3: -3.487}
  ];

  $scope.options = {
    stacks: [{axis: "y", series: ["id_0", "id_2", "id_1"]}],
    lineMode: "cardinal",
    series: [
    {
      id: "id_0",
      y: "val_0",
      label: "Seguimientos",
      type: "area",
      color: "#1f77b4",
      axis: "y",
      thickness: "1px",
      drawDots: true,
      lineMode: "dashed",
      visible: true,
      striped: false
    },
    {
      id: "id_1",
      y: "val_1",
      label: "Cotizaciones",
      type: "area",
      color: "#ff7f0e",
      axis: "y",
      thickness: "1px",
      drawDots: true
    },
    {
      id: "id_2",
      y: "val_2",
      label: "Seguros",
      type: "area",
      color: "#d62728",
      axis: "y",
      thickness: "1px",
      drawDots: true
    }
    ],
    axes: {x: {type: "linear", key: "x"}, y: {type: "linear"}},
    tension: 0.6,
    tooltip: {mode: "axes", interpolate: false},
    drawLegend: true,
    drawDots: true,
    columnsHGap: 1
  };
})

.controller('kpipieController', function ($scope) {
  
  var colors = d3.scale.category10();
  $scope.data = [
  {label: "Ponderado", value: 12.2, color: colors(0)}, 
  {label: "Meta", value: 45, color: colors(1)}
  ];

  $scope.options = {thickness: 10};
  
  $scope.gauge_data = [
  {label: "Ponderado", value: 75, suffix: "%", color: "steelblue"}
  ];
  $scope.gauge_options = {thickness: 5, mode: "gauge", total: 100};
  
  setInterval(function() {
    $scope.gauge_data[0].value = parseInt((0.9 + Math.random()*0.1)*100);
    $scope.$apply();
  }, 2000);
  
  $scope.pie_options = {thickness: 100};

})
