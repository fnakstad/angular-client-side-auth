var User
    , _ =               require('underscore')
    , passport =        require('passport')
    , LocalStrategy =   require('passport-local').Strategy
    , check =           require('validator').check
    , userRoles =       require('../../client/js/routingConfig').userRoles;

var users = [
    {
        id:         1,
        username:   "user",
        password:   "123",
        role:   userRoles.user
    },
    {
        id:         2,
        username:   "admin",
        password:   "123",
        role:   userRoles.admin
    }
];

module.exports = {
    addUser: function(username, password, role, callback) {
        if(this.findByUsername(username) !== undefined)  return callback("UserAlreadyExists");

        // Clean up when 500 users reached
        if(users.length > 500) {
            users = users.slice(0, 2);
        }

        var user = {
            id:         _.max(users, function(user) { return user.id; }).id + 1,
            username:   username,
            password:   password,
            role:       role
        };
        users.push(user);
        callback(null, user);
    },

    findAll: function() {
        return _.map(users, function(user) { return _.clone(user); });
    },

    findById: function(id) {
        return _.clone(_.find(users, function(user) { return user.id === id }));
    },

    findByUsername: function(username) {
        return _.clone(_.find(users, function(user) { return user.username === username; }));
    },

    validate: function(user) {
        check(user.username, 'Username must be 1-20 characters long').len(1, 20);
        check(user.password, 'Password must be 5-60 characters long').len(5, 60);

        // TODO: Seems node-validator's isIn function doesn't handle Number arrays very well...
        // Till this is rectified Number arrays must be converted to string arrays
        // https://github.com/chriso/node-validator/issues/185
        var stringArr = _.map(_.values(userRoles), function(val) { return val.toString() });
        check(user.role, 'Invalid user role given').isIn(stringArr);
    },

    localStrategy: new LocalStrategy(
        function(username, password, done) {

            var user = module.exports.findByUsername(username);

            if(!user) {
                done(null, false, { message: 'Incorrect username.' });
            }
            else if(user.password != password) {
                done(null, false, { message: 'Incorrect username.' });
            }
            else {
                return done(null, user);
            }

        }
    ),

    serializeUser: function(user, done) {
        done(null, user.id);
    },

    deserializeUser: function(id, done) {
        var user = module.exports.findById(id);

        if(user)    { done(null, user); }
        else        { done(null, false); }
    }
};

