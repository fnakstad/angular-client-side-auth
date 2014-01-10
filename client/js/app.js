'use strict';

angular.module('angular-client-side-auth', ['ngCookies', 'ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    // Public routes
    $stateProvider
        .state('public', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.public
            }
        })
        .state('public.404', {
            url: '/404',
            templateUrl: '404'
        });

    // Anonymous routes
    $stateProvider
        .state('anon', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.anon
            }
        })
        .state('anon.login', {
            url: '/login',
            templateUrl: 'login',
            controller: 'LoginCtrl'
        })
        .state('anon.register', {
            url: '/register',
            templateUrl: 'register',
            controller: 'RegisterCtrl'
        });

    // Regular user routes
    $stateProvider
        .state('user', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.user
            }
        })
        .state('user.home', {
            url: '/',
            templateUrl: 'home',
            controller: 'HomeCtrl'
        })
        .state('user.private', {
            url: '/private',
            templateUrl: 'private',
            controller: 'PrivateCtrl',
            data: {
                access: access.user
            }
        })
        .state('user.private.nestedOne', {
            url: '/nestedOne',
            templateUrl: '',
            controller: 'PrivateNestedOneCtrl'
        });

    // Admin routes
    $stateProvider
        .state('admin', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.admin
            }
        })
        .state('admin.admin', {
            url: '/admin',
            templateUrl: 'admin',
            controller: 'AdminCtrl'
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