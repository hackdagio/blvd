'use strict';

app.directive('match', match);

function match ($parse) {
  return {
  require: '?ngModel',
  restrict: 'A',
  link: function(scope, elem, attrs, ctrl) {
    var matchGetter = $parse(attrs.match);

    scope.$watch(getMatchValue, function(){
      ctrl.$$parseAndValidate();
    });

    ctrl.$validators.match = function(){
      return ctrl.$viewValue === getMatchValue();
    };

    function getMatchValue(){
      var match = matchGetter(scope);
      if(angular.isObject(match) && match.hasOwnProperty('$viewValue')){
        match = match.$viewValue;
      }
      return match;
      }
    }
  };
}
match.$inject = ["$parse"];