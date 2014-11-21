'use strict';

angular.module('kaizen-concepto.controllers-views', [])

.controller('inicioController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/acceder');
    }

    $scope.authentication = authService.authentication;

}])

.controller('indicadoresController', ['$scope', function ($scope) {
   
}]);


