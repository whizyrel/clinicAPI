const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes/routes');

const app = express();

// use bodyParser
app.use(bodyParser.json());

// solve cors problems
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, application/x-www-form-urlencoded, Accept, Authorization, content-Type');
    next();
});

// serve static files at top level
app.use(express.static('public'));

// use routes from routes
app.use('/api', routes);

// error handling middleware
app.use((err, req, res, next) => {
    // console.log(err);
    res.send({
        error: err.message
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