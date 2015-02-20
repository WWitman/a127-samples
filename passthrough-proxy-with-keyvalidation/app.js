'use strict';

var a127 = require('a127-magic');
var express = require('express');
var app = express();

module.exports = app; // for testing

// initialize a127 framework
a127.init(function(config) {

  // include a127 middleware
  app.use(a127.middleware(config));

  // error handler to emit errors as a json string
  app.use(function(err, req, res, next) {
    if (err && typeof err === 'object') {
      Object.defineProperty(err, 'message', { enumerable: true });
      res.end(JSON.stringify(err));
    }
    next(err);
  });

  // begin listening for client requests
  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log('proxy started on port %d', port);
});
