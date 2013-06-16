(function(exports){

    var userRoles = {
        public: 1, // 001
        user:   2, // 010
        admin:  4  // 100
    };

    exports.userRoles = userRoles;

    exports.accessLevels = {
        public: userRoles.public | userRoles.user | userRoles.admin,
        anon:   userRoles.public,
        user:   userRoles.user | userRoles.admin,
        admin:  userRoles.admin
    };

})(typeof exports === 'undefined'? this['routingConfig']={}: exports);