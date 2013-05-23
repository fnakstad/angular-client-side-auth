'use strict';

/* Services */
var services = angular.module('angular-client-side-auth.services', []);

services.factory('Auth', function($http, $rootScope, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles;

    $rootScope.user = $cookieStore.get('user') || { username: '', role: userRoles.public };
    $cookieStore.remove('user');

    $rootScope.accessLevels = accessLevels;
    $rootScope.userRoles = userRoles;

    return {
        authorize: function(accessLevel, role) {
            return accessLevel & role;
        },
        isLoggedIn: function(user) {
            return user.role === userRoles.user || user.role === userRoles.admin;
        },
        register: function(user, success, error) {
            $http.post('/register', user).success(success).error(error);
        },
        login: function(user, success, error) {
            console.log(user);
            $http.post('/login', user).success(function(user){
                $rootScope.user = user;
                success(user);
            }).error(error);
        },
        logout: function(success, error) {
            $http.post('/logout').success(function(){
                $rootScope.user.username = '';
                $rootScope.user.role = userRoles.public;
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles
    };
});

services.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/users').success(success).error(error);
        }
    };
});
