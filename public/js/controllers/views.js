'use strict';

angular.module('kaizen-concepto.controllers-views', [])

.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;

}])

.controller('homeController', ['$scope', function ($scope) {
   
}]);
