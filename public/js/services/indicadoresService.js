'use strict';
app.factory('indicadoresService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var indicadoresServiceFactory = {};

    var _getIndicadores = function () {

        return $http.get(serviceBase + 'api/kpis/ongoing/general').then(function (results) {
            return results;
        });
    };

    indicadoresServiceFactory.getIndicadores = _getIndicadores;

    return indicadoresServiceFactory;

}]);