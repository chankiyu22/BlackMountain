
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , connect = require('./routes/connect')
  , discover = require('./routes/discover')
  , groups = require('./routes/groups')
  , profile = require('./routes/profile')
  , settings = require('./routes/settings')
  , signup = require('./routes/signup')
  , user = require('./routes/user')
  , tweets = require('./routes/tweets')
  , search = require('./routes/search')
  , http = require('http')
  , path = require('path')
  , sockets = require('./lib/sockets');

var app = express();

store  = new express.session.MemoryStore;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({ secret: 'secret', store: store}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/docs/', function(req, res){res.sendfile('./public/docs/app.js.html');});
app.get('/docs/:file', function(req, res){res.sendfile('./public/docs/' + req.params.file);});

app.get('/', routes.index); 
app.get('/login', login.index);
app.post('/login', login.verify);
app.get('/login/captcha', login.captcha);
app.get('/login/error', login.error);
app.get('/logout', login.logout);
app.post('/login/captcha', login.captcha);
app.get('/signup', signup.index);
app.post('/signup', signup.index);
app.post('/signup/addUser', signup.createUser);
app.post('/follow', user.follow);
app.post('/publish_tweet', tweets.publish_tweet);
app.get('/connect', connect.connect);
app.get('/mentions', connect.mentions);
app.get('/discover', discover.discover);
app.get('/activity', discover.activity);
app.get('/groups', groups.groups);
app.get('/groups/create', groups.create);
app.get('/groups/discover', groups.discover);
app.post('/groups/join', groups.join);
app.post('/groups/create', groups.register);
app.get('/:username', profile.profile);
app.get('/:username/following', profile.following);
app.get('/:username/followers', profile.followers);
app.get('/:username/favorites', profile.favorites);
app.get('/settings/profile', settings.profile);
app.get('/settings/account', settings.account);
app.get('/settings/password', settings.password);
app.get('/search', search.search);

var server = http.createServer(app);

var io = require('socket.io', {'log level': 0}).listen(server);

sockets.initSocketIo(io);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
