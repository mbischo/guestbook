'use strict';

angular.module('service.employee', ['lib.lodash']).
        factory('employeeService', function ($http, $q, _) {
            var EmployeeService = {};
            var list = [
                {
                    id: 1,
                    firstName: 'Joe',
                    lastName: 'Smith',
                    email: 'no@body.com',
                    deleted: false
                },
                {
                    id: 2,
                    firstName: 'Matt',
                    lastName: 'Bischoff',
                    email: 'some@one.com',
                    deleted: false
                },
                {
                    id: 3,
                    firstName: 'Frank',
                    lastName: 'Nelson',
                    email: 'delete@ed.com',
                    deleted: true
                }
            ];
            EmployeeService.getEmployee = function (index) {
                return list[index];
            };
            EmployeeService.addEmployee = function (emp) {
                list.push(emp);
            };
            EmployeeService.removeEmployee = function (emp) {
                list.splice(list.indexOf(emp), 1);
            };
            EmployeeService.size = function () {
                return list.length;
            };
            EmployeeService.listActiveEmployees = function() {
                return _.where(list, {deleted: false});
            };

            return EmployeeService;
        });
