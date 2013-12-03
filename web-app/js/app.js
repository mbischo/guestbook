'use strict';

angular.module('guestbookApp', [
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'service.guest',
            'service.employee',
            'guestbookApp.controllers'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'CheckinCtrl'
                    })
                    .when('/checkin', {
                        templateUrl: 'views/checkin.html',
                        controller: 'CheckinCtrl'
                    })
                    .when('/guests', {
                        templateUrl: 'views/guests.html',
                        controller: 'GuestsCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        });