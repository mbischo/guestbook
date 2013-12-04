'use strict';

angular.module('service.employee', ['ngResource', 'lib.lodash']).
        factory('Employee', function($http, $q, $resource) {
            return $resource('employees/:id', {}, {
                query: {method:'GET', url:'employees', isArray: true}
            });
        });
