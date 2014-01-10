'use strict';

angular.module('angular-client-side-auth', ['ngCookies', 'ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    // Public routes
    $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: '404',
            data: {
                access: access.public
            }
        });

    // Anonymous routes
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login',
            controller: 'LoginCtrl',
            data: {
                access: access.anon
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'register',
            controller: 'RegisterCtrl',
            data: {
                access: access.anon
            }
        });

    // Regular user routes
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home',
            controller: 'HomeCtrl',
            data: {
                access: access.user
            }
        })
        .state('private', {
            url: '/private',
            templateUrl: 'private',
            controller: 'PrivateCtrl',
            data: {
                access: access.user
            }
        });

    // Admin routes
    $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'admin',
            controller: 'AdminCtrl',
            data: {
                access: access.admin
            }
        });


    $urlRouterProvider.otherwise('/404');
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        }
    });

}])

    .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.data.access)) {
                if(Auth.isLoggedIn()) $location.path('/');
                else                  $location.path('/login');
            }
        });

    }]);