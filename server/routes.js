var _ =           require('underscore')
    , path =      require('path')
    , passport =  require('passport')
    , AuthCtrl =  require('./controllers/auth')
    , UserCtrl =  require('./controllers/user')
    , User =      require('./models/User.js')
    , userRoles = require('../client/js/routingConfig').userRoles;

module.exports = function(app) {

    // Views
    app.get('/partials/*', function (req, res) {
        var requestedView = path.join('./', req.url);
        res.render(requestedView);
    });

    // Auth stuff
    app.post('/register', AuthCtrl.register);
    app.post('/login', AuthCtrl.login);
    app.post('/logout', AuthCtrl.logout);

    // User resource
    app.get('/users', UserCtrl.index);

    // All other get requests should be handled by AngularJS's client-side routing system
    app.get('/*', function(req, res){
        var role = userRoles.public, username = '';
        if(req.user) {
            role = req.user.role;
            username = req.user.username;
        }
        res.cookie('user', JSON.stringify({
            'username': username,
            'role': role
        }));
        res.render('index');
    });
}