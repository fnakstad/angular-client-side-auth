var User
    , _ =               require('underscore')
    , passport =        require('passport')
    , LocalStrategy =   require('passport-local').Strategy
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

function addUser(username, password, role, callback) {
    if(findByUsername(username) !== undefined)  return callback("UserAlreadyExists");

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
};

function findAll() {
    return users;
};

function findById(id) {
    return _.find(users, function(user) { return user.id === id });
};

function findByUsername(username) {
    return _.find(users, function(user) { return user.username === username; });
};

var localStrategy = new LocalStrategy(
    function(username, password, done) {

        var user = findByUsername(username);

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
)

function serializeUser(user, done) {
    done(null, user.id);
}

function deserializeUser(id, done) {
    var user = findById(id);
    if(user)    { done(null, user); }
    else        { done({ message: 'User not found' }, null); }
}

module.exports = {
    addUser: addUser,
    findAll: findAll,
    findById: findById,
    findByUsername: findByUsername,
    localStrategy: localStrategy,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
}