require('dotenv').config();

var express = require('express');
var app = express();
var port = process.env.PORT;
var api = require('./api');
var date = new Date();
var now = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
var twitter = require('./controllers/twitter/');

app.set('view engine', 'ejs');

app.use('/css/', express.static(__dirname + '/public/scripts/css/'));
app.use('/js/', express.static(__dirname + '/public/scripts/js/'));
app.use('/templates/', express.static(__dirname + '/templates/'));

api(app);

app.listen(port);
console.log('\n\033[1;33m' + now + ': \033[4mListening on port:', port, '\033[0m\ndirname =', __dirname, '\n');