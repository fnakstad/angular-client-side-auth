'use strict';

angular.module('angular-client-side-auth')
.directive('accessLevel', ['$rootScope', 'Auth', function($rootScope, Auth) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var prevDisp = element.css('display');
            $rootScope.$watch('user.role', function(role) {
                if(!Auth.authorize(attrs.accessLevel))
                    element.css('display', 'none');
                else
                    element.css('display', prevDisp);
            });
        }
    };
}]);