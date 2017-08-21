const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
// app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
// parse application/json 
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
require('./server/routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.listen(port, function () {
  console.log(`Running on port ${port}!`)
})
// module.exports = app;
exports = module.exports = app;
process.on('uncaughtException', (err) => {
    console.log(err);
});

