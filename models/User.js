var User
    , _ =               require('underscore')
    , passport =        require('passport')
    , LocalStrategy =   require('passport-local').Strategy;

var users = [
    {
        id:         1,
        username:   "user",
        password:   "123",
        userRole:   2
    },
    {
        id:         2,
        username:   "admin",
        password:   "123",
        userRole:   4
    }
];

function addUser(username, password) {
    var user = {
        id:         _.max(users, function(user) { return user.id; }) + 1,
        username:   username,
        password:   password,
        userRole:   2
    };
    users.push(user);

    return user;
};

function findById (id) {
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
    findById: findById,
    findByUsername: findByUsername,
    localStrategy: localStrategy,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
}