// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments');
	require('dotenv').config();
}
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./db'); // loads our connection to the mongo database
const passport = require('./passport');

const app = express();
//	Socket.io implementation
const http = require('http').Server(app);
const io = require('socket.io')(http);

const routes = require("./routes") (io);

const PORT = process.env.PORT || 3001;

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: process.env.APP_SECRET || 'this is the default passphrase',
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// Add routes, both API and view
app.use(routes);

// If its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use(express.static(path.join(__dirname, '../client/build')));
	console.log("GOT TO HERE",path.join(__dirname, '../client/build/index.html'));
	
	app.use('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'))
	});
}


// Error handler
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======');
	console.error(err.stack);
	res.status(500);
});

io.on('connection',function(socket) {
	console.log('a user connected');
	socket.on('disconnect',function() {
	  console.log('user disconnected');
	})
})

// Starting Server
http.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
