'use strict';

const express = require('express');
const path = require('path');

/**
 * Create the Express application.
 */
const app = express();

/**
 * The 'trust proxy' setting is required if you will be deploying your
 * application to Heroku, or any other environment where you will be behind an
 * HTTPS proxy.
 */
app.set('trust proxy', true);

/*
 We need to setup a static file server that can serve the assets for the
 angular application.  We don't need to authenticate those requests, so we
 setup this server before we initialize Stormpath.
 */
app.use('/', express.static(path.join(__dirname, '..', 'dist'), {redirect: false}));

app.use(function (req, res, next) {
  console.log(new Date, req.method, req.url);
  next();
});

app.route('/*')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });

/**
 * Start the web server.
 */
const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Application running at http://localhost:' + port);
});
