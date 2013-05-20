(function(exports){

    exports.userRoles = {
        public: 1, // 001
        user:   2, // 010
        admin:  4  // 100
    };

    exports.accessLevels = {
        public: 7, // 111
        anon:   1, // 001
        user:   6, // 110
        admin:  4  // 100
    };

})(typeof exports === 'undefined'? this['routingConfig']={}: exports);