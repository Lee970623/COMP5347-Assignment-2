var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./app/routes/routes')

// initial setting
var app = express();
app.set('views', path.join(__dirname, '/app/views'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'secretMessage', cookie: { maxAge: 600000 }, resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, '/public')))

// routes
app.use('/', routes);

app.listen(3000, function() {
    console.log('listening on port 3000\n');
})