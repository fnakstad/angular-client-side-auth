'use strict';

angular.module('angular-client-side-auth')
.factory('Auth', function($http, $rootScope, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles;

    $rootScope.user = $cookieStore.get('user') || { username: '', role: userRoles.public };
    $cookieStore.remove('user');

    $rootScope.accessLevels = accessLevels;
    $rootScope.userRoles = userRoles;

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined)
                role = $rootScope.user.role;
            return accessLevel & role;
        },
        isLoggedIn: function(user) {
            if(user === undefined)
                user = $rootScope.user;
            return user.role === userRoles.user || user.role === userRoles.admin;
        },
        register: function(user, success, error) {
            $http.post('/register', user).success(success).error(error);
        },
        login: function(user, success, error) {
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

angular.module('angular-client-side-auth')
.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/users').success(success).error(error);
        }
    };
});
