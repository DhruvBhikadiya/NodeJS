const express = require('express');

const port = 8080;

const app = express();

const db = require('./config/db');

app.use('/',require('./router/index'));

app.use(express.urlencoded());

app.listen(port, (e) => {
    e?console.log(e):console.log("Server is running on port",port);
})