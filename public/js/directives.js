'use strict';

/* Directives */

angular.module('kaizen-concepto.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
