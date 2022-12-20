//Import express
let express = require('express');

//Initialize the app
let app=express();

var port = process.env.PORT || 8000;

let session = require('express-session');
app.arguments(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
})
);

//Login
app.get('/login/:user', (req, res) => {
    req.session.user = req.params.user;
    console.log(req.session);
    res.send('Hello' + req.session.user);
});

//Show user session
app.get('/test', (req, res) => {
    console.log(req.session.user);
});

//Logout endpoint