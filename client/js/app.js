'use strict';

angular.module('angular-client-side-auth', ['angular-client-side-auth.services', 'angular-client-side-auth.directives', 'ngCookies'])

    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $routeProvider.when('/',
        {
            templateUrl:    '/partials/home',
            controller:     HomeCtrl,
            access:         access.user
        });
    $routeProvider.when('/login',
        {
            templateUrl:    '/partials/login',
            controller:     LoginCtrl,
            access:         access.anon
        });
    $routeProvider.when('/register',
        {
            templateUrl:    '/partials/register',
            controller:     RegisterCtrl,
            access:         access.anon
        });
    $routeProvider.when('/private',
        {
            templateUrl:    '/partials/private',
            controller:     PrivateCtrl,
            access:         access.user
        });
    $routeProvider.when('/admin',
        {
            templateUrl:    '/partials/admin',
            controller:     AdminCtrl,
            access:         access.admin
        });
    $routeProvider.when('/404',
        {
            templateUrl:    '/partials/404',
            access:         access.public
        });
    $routeProvider.otherwise({redirectTo:'/404'});

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

    .run(['$rootScope', '$location', '$cookieStore', function ($rootScope, $location, $cookieStore) {

        $rootScope.accessLevels = routingConfig.accessLevels;
        $rootScope.userRoles = routingConfig.userRoles;

        $rootScope.user = $cookieStore.get('user') || { username: '', role: routingConfig.userRoles.public };
        $cookieStore.remove('user');

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
            if (!(next.access & $rootScope.user.role)) {
                if($rootScope.user.role === routingConfig.userRoles.user || $rootScope.user.role === routingConfig.userRoles.admin) {
                    $location.path('/');
                }
                else {
                    $location.path('/login');
                }
            }
        });

        $rootScope.appInitialized = true;
    }]);