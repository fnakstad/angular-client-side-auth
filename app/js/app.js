'use strict';

angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngCookies'])

    .constant('routingConfig', {
        userRoles: {
            public: 1, // 001
            user:   2, // 010
            admin:  4  // 100
        },
        accessLevels: {
            public: 7, // 111
            anon:   1, // 001
            user:   6, // 110
            admin:  4  // 100
        }
    })

    .config(['$routeProvider', '$locationProvider', 'routingConfig', function ($routeProvider, $locationProvider, routingConfig) {

    var access = routingConfig.accessLevels;

    $routeProvider.when('/',
        {
            templateUrl:    'partials/home',
            controller:     HomeCtrl,
            access:         access.user
        });
    $routeProvider.when('/login',
        {
            templateUrl:    'partials/login',
            controller:     LoginCtrl,
            access:         access.public
        });
    $routeProvider.when('/register',
        {
            templateUrl:    'partials/register',
            controller:     RegisterCtrl,
            access:         access.public
        });
    $routeProvider.when('/private',
        {
            templateUrl:    'partials/private',
            controller:     PrivateCtrl,
            access:         access.user
        });
    $routeProvider.when('/admin',
        {
            templateUrl:    'partials/admin',
            controller:     AdminCtrl,
            access:         access.admin
        });
    $routeProvider.when('/404',
        {
            templateUrl:    'partials/404',
            access:         access.public
        });
    $routeProvider.otherwise({redirectTo:'/404'});

    $locationProvider.html5Mode(true);

}])

    .run(['$rootScope', '$location', '$cookieStore', 'routingConfig', function ($rootScope, $location, $cookieStore, routingConfig) {

        $rootScope.accessLevels = routingConfig.accessLevels;
        $rootScope.userRole = $cookieStore.get('userRole') || routingConfig.userRoles.public;
        $cookieStore.remove('userRole');

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (!(next.$route.access & $rootScope.userRole)) {
                if($rootScope.userRole == routingConfig.userRoles.user) {
                    $location.path('/');
                }
                else {
                    $location.path('/login');
                }
            }
        });
    }]);