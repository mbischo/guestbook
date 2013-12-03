'use strict';

angular.module('guestbookApp.controllers',
                ['lib.lodash', 'service.guest', 'service.employee']).
        controller('CheckinCtrl', function ($scope, $location, _, guestService, employeeService) {

            $scope.checkin = function() {
                var cmd = $scope.checkingIn;
                guestService.addGuest(cmd);
                $location.path('/guests');
            };

            $scope.getEmployees = function() {
                return employeeService.listActiveEmployees();
            };

        }).
        controller('GuestsCtrl', function ($scope, _, guestService, Guest) {

            $scope.activeGuests = Guest.query();

        });
