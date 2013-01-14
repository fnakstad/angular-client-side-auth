var path = require('path')
    , passport = require('passport')
    , User = require('./models/User.js');

module.exports = function(app) {

    // Partial views
    app.get('/partials/*', function (req, res) {
        var requestedView = path.join('./', req.url);
        res.render(requestedView);
    });

    // Auth stuff
    app.post('/login', function(req, res, next) {
        passport.authenticate('local',
            function(err, user) {
                if(err)     { return next(err); }
                if(!user)   { res.send(400); }

                req.logIn(user, function(err) {
                    if(err) {
                        return next(err);
                    }
                    res.json(200, { "userRole": user.userRole });
                });
            })(req, res, next);
    });

    app.post('/logout', function(req, res) {
        req.logout();
        res.send(200);
    });

    app.post('/register', function(req, res, next) {
        var user = User.addUser(req.body.username, req.body.password);
        req.logIn(user, function(err) {
            if(err)     { next(err); }
            else        { res.json(200, { "userRole": user.userRole }); }
        });
    });

    // All other get requests should be handled by AngularJS's client-side routing system
    app.get('/*', function(req, res){
        var userRole = 1;
        if(req.user) {
            userRole = req.user.userRole;
        }
        res.cookie('userRole', userRole);
        res.render('index');
    });
}