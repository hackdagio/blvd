'use strict';

angular.module('kaizen-concepto.controllers-views', [])

// I provide a request-transformation method that is used to prepare the outgoing
// request as a FORM post instead of a JSON packet.

.factory("transformRequestAsFormPost", function() {

  function transformRequest( data, getHeaders ) {
    var headers = getHeaders();
    headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
    return( serializeData( data ) );
  }

  return( transformRequest );

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

.controller('apiController', function ($scope, $http) {

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

.controller('usuariosController', function ($scope) { })

.controller('inicioController', function ($scope) { })
