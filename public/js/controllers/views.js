'use strict';

angular.module('kaizen-concepto.controllers-views', [])

.controller('inicioController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/acceder');
    }

    $scope.authentication = authService.authentication;
}])

.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}])

.controller('indicadoresController', ['$scope', 'indicadoresService', function ($scope, indicadoresService) {

	$scope.indicadores = [];

	indicadoresService.getIndicadores('ongoing2', 'general').then(function (results) {
		$scope.indicadores = results.data;

	}, function (error) {

	});

	$scope.ranking = [];
	indicadoresService.getIndicadores('ranking2', '').then(function (results) {
		$scope.ranking = results.data;

	}, function (error) {

	});

	$scope.allus = [];
	indicadoresService.getIndicadores('ongoing2', 'allus').then(function (results) {
		$scope.allus = results.data;

	}, function (error) {

	});

	$scope.ecc = [];
	indicadoresService.getIndicadores('ongoing2', 'ecc').then(function (results) {
		$scope.ecc = results.data;

	}, function (error) {

	});

	$scope.sccp = [];
	indicadoresService.getIndicadores('ongoing2', 'sccp').then(function (results) {
		$scope.sccp = results.data;

	}, function (error) {

	});

	var tooltip1 = '<b>M:</b> Meta';
	var tooltip2 = '<b>C:</b> Cumplimiento';
	var tooltip3 = '<b>Número Grande:</b> Valor Real';
	var tooltip4 = '<b>Delta:</b> Diferencia entre mes actual y periodo anterior';

	$scope.tooltipKpi = tooltip1 + '<br /><br />' + tooltip2 + '<br /><br />' + tooltip3 + '<br /><br />' + tooltip4;

}])

.directive("popoverHtmlUnsafePopup", function () {
  return {
    restrict: "EA",
    replace: true,
    scope: { title: "@", content: "@", placement: "@", animation: "&", isOpen: "&" },
    templateUrl: "partials/popover-html-unsafe-popup"
  };
})

.directive("popoverHtmlUnsafe", [ "$tooltip", function ($tooltip) {
  return $tooltip("popoverHtmlUnsafe", "popover", "click");
}]);


