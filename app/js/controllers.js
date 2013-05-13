'use strict';

/* Controllers */

function AppCtrl($rootScope, $scope, $location, Auth) {

    $rootScope.accessLevels = routingConfig.accessLevels;
    $rootScope.userRoles = routingConfig.userRoles;

    $scope.logout = function() {
        Auth.logout(function() {
            $rootScope.user.role = routingConfig.userRoles.public;
            $location.path('/login');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };
}

function LoginCtrl($rootScope, $scope, $location, Auth) {
    $rootScope.activeNavItem = 'login';
    $scope.rememberme = true;

    $scope.login = function() {
        Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberme: $scope.rememberme
            },
            function(res) {
                console.log(res);
                $rootScope.user = res;
                $location.path('/');
            },
            function(err) {
                $rootScope.error = "Failed to login";
            });
    };
}

function MenuCtrl($rootScope, $scope) {
    $scope.showMenuItem = function(accessLevel) {
        return !!($rootScope.user.role & accessLevel);
    }
}

function HomeCtrl($rootScope) {
    $rootScope.activeNavItem = 'home';
}

function RegisterCtrl($rootScope, $scope, $location, Auth) {
    $rootScope.activeNavItem = 'register';
    $scope.role = routingConfig.userRoles.user;

    $scope.register = function() {
        Auth.register({
                username: $scope.username,
                password: $scope.password,
                role: $scope.role
            },
            function(res) {
                $rootScope.user = res;
                $location.path('/');
            },
            function(err) {
                console.log(err);
                $rootScope.error = err;
            });
    };
}

function PrivateCtrl($rootScope) {
    $rootScope.activeNavItem = 'private';
}

function AdminCtrl($rootScope) {
    $rootScope.activeNavItem = 'admin';
}
