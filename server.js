var express =       require('express')
    , http =        require('http')
    , passport =    require('passport')
    , path =        require('path')
    , User =        require('./models/User.js');

var app = express();

app.set('views', __dirname + '/app');
app.set('view engine', 'jade');
app.use(express.logger('dev'))
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.session(
    {
        secret: "Superdupersecret",
        cookie: { maxAge: 3600000 * 24 * 7 }
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.localStrategy);
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./routes.js')(app);

app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});