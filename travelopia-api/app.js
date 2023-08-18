var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const yaml = require('js-yaml');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

const environment = argv.env || 'local';
const configFilePath = path.join(__dirname, 'config', `${environment}.yaml`);
try {
    const configFileContent = fs.readFileSync(configFilePath, 'utf8');
    let config = yaml.load(configFileContent);
    global.config = config
} catch (error) {
    console.error(`Error reading or parsing ${environment}.yaml:`, error);
    process.exit(1);
}

const routesRouter = require('./lib/routes/base-router');
app.use('/', routesRouter);

app.listen(config.service.port, () => {
    console.log(`Example app listening on port ${config.service.port}`)
})

// Error handling middleware
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

module.exports = app;
