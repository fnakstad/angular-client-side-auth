'use strict';

/* Controllers */

function AppCtrl($rootScope, $scope, $location, Auth, routingConfig) {
    $scope.logout = function() {
        Auth.logout(function() {
            $rootScope.userRole = routingConfig.userRoles.public;
            $location.path('/login');
        }, function() {
            // Error
        });
    };
}

function MenuCtrl($rootScope, $scope) {
    $scope.showMenuItem = function(accessLevel) {
        return !!($rootScope.userRole & accessLevel);
    }
}

function HomeCtrl($rootScope) {
    $rootScope.activeNavItem = 'home';
}

function LoginCtrl($rootScope, $scope, $location, Auth) {
    $rootScope.activeNavItem = 'login';

    $scope.login = function() {
        Auth.login({
            username: $scope.username,
            password: $scope.password
        },
        function(res) {
            $rootScope.userRole = res.userRole;
            $location.path('/');
        },
        function(err) {
            $rootScope.error = "Failed to login";
        });
    };
}

function RegisterCtrl($rootScope, $scope, $location, Auth) {
    $rootScope.activeNavItem = 'register';

    $scope.register = function() {
        Auth.register({
                username: $scope.username,
                password: $scope.password
            },
            function(res) {
                $rootScope.userRole = res.userRole;
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
