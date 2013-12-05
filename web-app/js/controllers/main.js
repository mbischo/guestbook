'use strict';

angular.module('guestbookApp.controllers',
                ['lib.lodash', 'service.guest', 'service.employee']).
        controller('CheckinCtrl', function ($scope, $location, _, Guest, Employee) {

            $scope.checkin = function() {
                var cmd = $scope.checkingIn;
                cmd.checkinTime = new Date();
                Guest.save(cmd);
                $scope.goToSignout();
            };

            $scope.goToSignout = function() {
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

            $scope.manageEmployees = function() {
                $location.path('/employees');
            };

        }).
        controller('EmployeesCtrl', function ($scope, $location, _, Employee) {

            $scope.allEmployees = Employee.query();
            $scope.search = {deleted:false};

            $scope.goBack = function() {
                $location.path('/');
            };

            $scope.deleteEmployee = function(employee) {
                var currentEmployee = Employee.get({id:employee.id}, function() {
                    currentEmployee.deleted = true;
                    currentEmployee.$save();

                    employee.deleted = true;
                });
            };

            $scope.shouldShow = function(emp) {
              if ($scope.showDeleted) {
                  return true;
              }

              return !emp.deleted;
            };

            $scope.reviveEmployee = function(employee) {
                var currentEmployee = Employee.get({id:employee.id}, function() {
                    currentEmployee.deleted = false;
                    currentEmployee.$save();

                    employee.deleted = false;
                });
            };

            $scope.addEmployee = function() {
                var newEmp = {
                    firstName : $scope.newEmpFirstName,
                    lastName : $scope.newEmpLastName,
                    email : $scope.newEmpEmail,
                    deleted : false
                };

                Employee.save(newEmp,function() {
                    $scope.allEmployees = Employee.query();
                    $scope.clearNewEmployeeFields();
                });
            };

            $scope.clearNewEmployeeFields = function() {
                $scope.newEmpFirstName = "";
                $scope.newEmpLastName = "";
                $scope.newEmpEmail = "";
            };


        });
