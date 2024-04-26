const express = require('express');
const session = require('express-session');

const port = 8080;

const app = express();

const db = require('./config/db');
const passport =  require('passport');
const jwtpassword = require('./config/passport-jwt-strategy');

app.use(express.urlencoded());

app.use(session({
    name: 'admin',
    secret: 'DHRUV',
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*100
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/API/V1/index'));

app.listen(port, (e) => {
    if(e) console.log(e);

    console.log("server is running on port :- ",port);
});