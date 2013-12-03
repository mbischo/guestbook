'use strict';

angular.module('service.guest', ['ngResource', 'lib.lodash']).
        factory('Guest', function($http, $q, $resource) {
          return $resource(':guestId.json', {}, {
             query: {method:'GET', params:{guestId:'guests'}, isArray:true}
          });
        }).
        factory('guestService', function ($http, $q, _) {
            var GuestService = {};
            var list = [
                { name: 'Mister Pib',
                    company: 'PepsiCo',
                    checkinTime: 'time',
                    checkoutTime: null,
                    visitedEmployee: {
                        id: 1,
                        firstName: 'Joe',
                        lastName: 'Smith',
                        email: 'no@body.com',
                        deleted: false
                    }
                },
                { name: 'Bingo Bob',
                    company: 'Coke',
                    checkinTime: 'time',
                    checkoutTime: null,
                    visitedEmployee: {
                        id: 1,
                        firstName: 'Joe',
                        lastName: 'Smith',
                        email: 'no@body.com',
                        deleted: false
                    }
                }
            ];
            GuestService.getGuests = function (index) {
                return list[index];
            };
            GuestService.addGuest = function (guest) {
                list.push(guest);
                console.log(list);
            };
            GuestService.removeGuest = function (guest) {
                list.splice(list.indexOf(guest), 1);
            };
            GuestService.listActiveGuests = function () {
                return _.where(list, {checkoutTime: null});
            };
            GuestService.size = function () {
                return list.length;
            };

            return GuestService;
        });
