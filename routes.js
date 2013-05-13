var path =        require('path')
    , passport =  require('passport')
    , User =      require('./models/User.js')
    , userRoles = require('./app/js/routingConfig').userRoles;

module.exports = function(app) {

    // Views
    app.get('/partials/*', function (req, res) {
        var requestedView = path.join('./', req.url);
        res.render(requestedView);
    });

    // Auth stuff
    app.post('/login', function(req, res, next) {
        passport.authenticate('local',
            function(err, user) {
                if(err)     { return next(err); }
                if(!user)   { return res.send(400); }


                req.logIn(user, function(err) {
                    if(err) {
                        return next(err);
                    }

                    if(req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                    res.json(200, { "role": user.role, "username": user.username });
                });
            })(req, res, next);
    });

    app.post('/logout', function(req, res) {
        req.logout();
        res.send(200);
    });

    app.post('/register', function(req, res, next) {
        User.addUser(req.body.username, req.body.password, req.body.role, function(err, user) {
            if(err === 'UserAlreadyExists') return res.send(403, "User already exists");
            else if(err)                    return res.send(500);

            req.logIn(user, function(err) {
                if(err)     { next(err); }
                else        { res.json(200, { "role": user.role, "username": user.username }); }
            });
        });
    });

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