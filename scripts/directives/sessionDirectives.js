'use strict';

// app.directive('equals', function() {
//   return {
//     restrict: 'A', // only activate on element attribute
//     require: '?ngModel', // get a hold of NgModelController
//     link: function(scope, elem, attrs, ngModel) {
//       if(!ngModel) return; // do nothing if no ng-model

//       // watch own value and re-validate on change
//       scope.$watch(attrs.ngModel, function() {
//         validate();
//       });

//       // observe the other value and re-validate on change
//       attrs.$observe('equals', function (val) {
//         validate();
//       });

//       var validate = function() {
//         // values
//         var val1 = ngModel.$viewValue;
//         var val2 = attrs.equals;

//         // set validity
//         ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
//       };
//     }
//   }
// });


// app.directive('pwdCompare', function() {
//   return {
//     require: "ngModel",
//     scope: {
//       otherModelValue: "=compareTo"
//     },
//     link: function(scope, element, attributes, ngModel) {

//       ngModel.$validators.compareTo = function(modelValue) {
//         return modelValue == scope.otherModelValue;
//       };

//       scope.$watch("otherModelValue", function() {
//         ngModel.$validate();
//       });
//     }
//   };
// });

// app.directive('pwCheck', [function () {
//   return {
//     require: 'ngModel',
//     link: function (scope, elem, attrs, ctrl) {

//       var me = attrs.ngModel;
//       var matchTo = attrs.pwCheck;

//       scope.$watch('[me, matchTo]', function(value){
//         ctrl.$setValidity('pwmatch', scope[me] === scope[matchTo] );
//       });

//     }
//   }
// }]);

// app.directive('pwCheck', function() {
//   return {
//     require: 'ngModel',
//     link: function (scope, elem, attrs, ctrl) {
//       var firstPassword = '#' + attrs.pwCheck;
//       $(elem).add(firstPassword).on('keyup', function () {
//         scope.$apply(function () {
//           var v = elem.val()===$(firstPassword).val();
//           ctrl.$setValidity('pwcheck', v);
//         });
//       });
//     }
//   }
// });


// app.directive('match', match);
// function match ($parse) {
//   return {
//     require: '?ngModel',
//     restrict: 'A',
//     link: function(scope, elem, attrs, ctrl) {

//       var matchGetter = $parse(attrs.match);

//       scope.$watch(getMatchValue, function() {
//         ctrl.$validate();
//       });

//       function getMatchValue() {
//         var match = matchGetter(scope);
//         if(angular.isObject(match) && match.hasOwnProperty('$viewValue')) {
//           match = match.$viewValue;
//         }
//         return match;
//       }
//     }
//   }
// };