var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const port = 3000
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

const routesRouter = require('./lib/routes/base-router');
app.use('/', routesRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Error handling middleware
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

module.exports = app;
