'use strict';

angular.module('guestbookApp.controllers',
                ['lib.lodash', 'service.guest', 'service.employee']).
        controller('CheckinCtrl', function ($scope, $location, _, Guest, Employee) {

            $scope.checkin = function() {
                var cmd = $scope.checkingIn;
                cmd.checkinTime = new Date();
                Guest.save(cmd);
                $location.path('/guests');
            };

            $scope.employees = Employee.query();

        }).
        controller('GuestsCtrl', function ($scope, $location, _, Guest) {

            $scope.allGuests = Guest.query(function() {
                $scope.activeGuests = _.where($scope.allGuests, {checkoutTime:null});
            });

            $scope.checkout = function(guestId) {
                var currentGuest = Guest.get({id:guestId}, function() {
                    currentGuest.checkoutTime = new Date();
                    currentGuest.$save();

                    $location.path('/');
                });
            };

        });
