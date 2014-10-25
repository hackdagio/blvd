'use strict';

/* Controllers */

angular.module('kaizen-concepto.controllers', []).

controller('kaizenControllers', function ($scope, $http) {

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

}).

controller('loginController', function ($scope, $http, transformRequestAsFormPost) {

  // hide error messages until submit event
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

}).




controller('usuariosController', function ($scope) {

}).
controller('inicioController', function ($scope) {


})



// I provide a request-transformation method that is used to prepare the outgoing
// request as a FORM post instead of a JSON packet.
.factory(
  "transformRequestAsFormPost",
  function() {

        // I prepare the request data for the form post.
        function transformRequest( data, getHeaders ) {

          var headers = getHeaders();

          headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
          headers[ "Access-Control-Allow-Origin" ] = "*";

          return( serializeData( data ) );

        }


        // Return the factory value.
        return( transformRequest );


        // ---
        // PRVIATE METHODS.
        // ---


        // I serialize the given Object into a key-value pair string. This
        // method expects an object and will default to the toString() method.
        // --
        // NOTE: This is an atered version of the jQuery.param() method which
        // will serialize a data collection for Form posting.
        // --
        // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
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
                encodeURIComponent( name ) +
                "=" +
                encodeURIComponent( ( value == null ) ? "" : value )
                );

            }

            // Serialize the buffer and clean it up for transportation.
            var source = buffer
            .join( "&" )
            .replace( /%20/g, "+" )
            ;

            return( source );

          }

        }
);