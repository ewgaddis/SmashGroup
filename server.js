// Get required modules
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// Create app and apps
var app = express();
var apps = express();

var options = {
    host: '127.0.0.1',
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.crt')
};

// Initialize app and apps routes
require('./routes')(app, apps);

// Run servers
http.createServer(app).listen(80);
https.createServer(options, apps).listen(443);