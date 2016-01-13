var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var responseTime = require('response-time');

var routes = require('./routes/index');

var app = express();
app.use(cors());
app.use(responseTime());

//expose socket.io
// var io = socket_io();
// app.io = io;
//var io = socket_io();
//app.io = io;

// io.on('connection', function (socket) {
//   socket.on('loadData', function () {
//     models.Data.findAll({}).then(function (data) {
//       io.emit('data', data);
//     });
//   });
//   socket.on('newEmptyRow', function () {
//     models.Data.create({
//       code: = null,
//       stdout: = null,
//       stderr: = null,
//       resTime: = null,
//       language: = null
//     }).then(function (row) {
//       res.json(row);
//     });
//   });
//   socket.on('FillRow', function () {
//     models.Data.find({
//       where: {
//         resTime: null
//       }
//     }).then(function (row) {
//       if (row) {
//         user.updateAttributes({
//           code: = req.body.code,
//           stdout: = req.body.stdout,
//           stderr: = req.body.stderr,
//           resTime: = req.body.resTime,
//           language: = req.body.language
//         }).then(function (row) {
//           res.json(row);
//         });
//       } else {
//         res.json('no requests pending in database');
//       }
//     });
//   });
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
