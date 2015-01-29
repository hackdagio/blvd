'use strict';
app.factory('indicadoresService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var indicadoresServiceFactory = {};

    var _getIndicadores = function (type, consult) {

        return $http.get(serviceBase + 'api/kpis/' + type + '/' + consult).then(function (results) {
            return results;
        });
    };

    indicadoresServiceFactory.getIndicadores = _getIndicadores;

    return indicadoresServiceFactory;

}]);