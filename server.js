const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes/routes');

const app = express();

// use bodyParser
app.use(bodyParser.json());

// solve cors problems
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method == "OPTIONS") {
        return res.status(405).json({});
    }
    next();
});

// serve static files at top level
app.use('/', express.static('public'));

// use routes from routes
app.use('/api', routes);

// error handling middleware for wrong route
app.use((req, res, next) => {
    const error = new Error('Sorry, Page not Found');
    // @ts-ignore
    error.status = 404;
    next(error);
});

// error handling middleware for usage errors in routes || all errors
app.use((error, req, res, next) => {
    // console.log(err);
    res.status(error.status || 500).json({
        error: error.message
    });
    // call next handler
    next();
});

// specify port eith environment or 4000
const port = process.env.PORT || 4000;

// listen to requests from the port. [callback]: console when started
app.listen(port, function() {
    console.log(`[Server] started on port: ${port}`) ;
});