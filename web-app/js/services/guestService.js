'use strict';

angular.module('service.guest', ['ngResource', 'lib.lodash']).
        factory('Guest', function($http, $q, $resource) {
          return $resource('guests/:id', {}, {
              query: {method:'GET', url:'guests', isArray: true}
          });
        });
