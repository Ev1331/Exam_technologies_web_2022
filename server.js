// Import express
let express = require('express');
const session = require('express-session');

//Initialize the app
let app = express();

app.use(express.urlencoded({ extended: true })); //Pour pouvoir décoder le body
app.use(express.static("public")); //Pour le CSS

let router = require('./routes');

app.use(session({
    secret: 'my secret',
    resave : false,
    saveUninitialized : true
}));


app.use('/', router);

app.use(express.static('public'))

//Launch app to listen to specified port
app.listen(80, function () {
    console.log("Running on port 80"); 
})