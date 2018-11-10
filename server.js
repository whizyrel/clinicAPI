const express = require('express');
const routes = require('./api/routes/routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

const port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log(`[Server] started on port: ${port}`) ;
});