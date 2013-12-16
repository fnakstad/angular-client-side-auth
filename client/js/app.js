'use strict';

angular.module('angular-client-side-auth', ['ngCookies', 'ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $stateProvider
        .state('Home', {
            url: '/',
            templateUrl: 'home',
            controller: 'HomeCtrl',
            access: access.user
        })
        .state('Login', {
            url: '/login',
            templateUrl: 'login',
            controller: 'LoginCtrl',
            access: access.anon
        })
        .state('Register', {
            url: '/register',
            templateUrl: 'register',
            controller: 'RegisterCtrl',
            access: access.anon
        })
        .state('Private', {
            url: '/private',
            templateUrl: 'private',
            controller: 'PrivateCtrl',
            access: access.user
        })
        .state('Admin', {
            url: '/admin',
            templateUrl: 'admin',
            controller: 'AdminCtrl',
            access: access.admin
        })
        .state('404', {
            url: '/404',
            templateUrl: '404',
            access: access.public
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
            if (!Auth.authorize(next.access)) {
                if(Auth.isLoggedIn()) $location.path('/');
                else                  $location.path('/login');
            }
        });

    }]);