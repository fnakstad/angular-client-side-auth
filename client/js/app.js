'use strict';

angular.module('angular-client-side-auth', ['ngCookies', 'ui.state'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $stateProvider.state('Home', {
        url:         "/",
        controller:  "HomeCtrl",
        templateUrl: "/partials/home",
        access:      access.user
    });
    $stateProvider.state('Login', {
        url:         "/login",
        controller:  "LoginCtrl",
        templateUrl: "/partials/login",
        access:      access.anon
    });
    $stateProvider.state('Register', {
        url:         "/register",
        controller:  "RegisterCtrl",
        templateUrl: "/partials/register",
        access:      access.anon
    });

    $stateProvider.state('private', {
        url:         "/private",
        controller:  "PrivateCtrl",
        templateUrl: "/partials/private",
        access:      access.user
    });

    $stateProvider.state('Admin', {
        url:         "/admin",
        controller:  "AdminCtrl",
        templateUrl: "/partials/admin",
        access:      access.admin
    });
    $stateProvider.state('404', {
        url:         "/404",
        templateUrl: "/partials/404",
        access:      access.admin
    });
    $urlRouterProvider.otherwise('/404');

    $locationProvider.html5Mode(true);

    var interceptor = ['$location', '$q', function($location, $q) {
        function success(response) {
            return response;
        }

        function error(response) {

            if(response.status === 401) {
                $location.path('/login');
                return $q.reject(response);
            }
            else {
                return $q.reject(response);
            }
        }

        return function(promise) {
            return promise.then(success, error);
        }
    }];

    $httpProvider.responseInterceptors.push(interceptor);

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