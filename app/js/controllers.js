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

    $scope.login = function() {
        Auth.login({
                username: $scope.username,
                password: $scope.password
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

    $scope.register = function() {
        Auth.register({
                username: $scope.username,
                password: $scope.password
            },
            function(res) {
                $rootScope.user = res;
                $location.path('/');
            },
            function(err) {
                $rootScope.error = "Failed to register";
            });
    };
}

function PrivateCtrl($rootScope) {
    $rootScope.activeNavItem = 'private';
}

function AdminCtrl($rootScope) {
    $rootScope.activeNavItem = 'admin';
}
