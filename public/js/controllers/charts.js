'use strict';
app.directive('metrics', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

  var serviceBase = ngAuthSettings.apiServiceBaseUri;
  return {
    restrict: 'E',
    link: function(scope, element) {

      var serviceBase = ngAuthSettings.apiServiceBaseUri;

      var success = function(result) {
        data_graphic({
          data: result,
          width: 400,
          height: 250,
          target: element[0],
          x_accessor: "Mes",
          y_accessor: "Ponderado"
        });
      };

      var error = function() {
        console.log('Error.');
      };

      $http.get(serviceBase + 'api/kpis/history/general').success(success).error(error);
    }
  };

}]);