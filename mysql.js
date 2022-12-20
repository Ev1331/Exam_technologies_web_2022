// Import express
let express = require("express");

//Initialize the app
let app = express();

app.use(express.urlencoded({ extended: true })) //Pour pouvoir décoder le body

var mysql = require("mysql");
//Database connection

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "users",
});
connection.connect(function (error) { if (error) console.log(error); });

// Send message for default URL
app.get('/', (req, res) => {
    res.send("Hello World !");
});

// Send list of users
app.get("/user", (req, res) => {
    connection.query("select * from user", function (error, result) {
        if (error) console(error);
        res.render("userList.ejs", { users: result });
    });
});


// Send form to add user
app.get('/user/add', (req, res) => {
    res.render("userAdd.ejs");
});

// user in DB
app.post("/user", (req, res) => {
    let user = { "lastname":req.body.lastname, "firstname":req.body.firstname};
    connection.query("INSERT INTO user SET ?", user, function (err, result) {
        if (err) console.log(err);
        res.redirect('/user');
    });
});



// Send update form
app.get('/user/update/:i', (req, res) => {
    let i = req.params.i;
    connection.query("select *  from user WHERE iduser=?;", i, function (error, result) { //sélection de toutes les colonnes
        if (error) console(error);
        res.render("userUpdate.ejs", { "iduser": result[0].iduser, "lastname": result[0].lastname, "firstname": result[0].firstname })
    });//Result[0] pour le 1er utilisateur
});


// Update user in DB
app.post("/user/update"), (req, res) => {
    let i = req.body.iduser;
    let user = { "lastname": req.body.lastname, "firstname": req.body.firstname };
    connection.query("UPDATE user SET ? WHERE iduser=?", [user, i], function(err, result){ //Les ? sont remplacés par les valeurs entre []
        if(err) console.log(err);
        res.redirect('/user');
    });
};

//Delete user
app.get('/user/delete/:i', (req, res) => {
    let i = req.params.i;
    connection.query("DELETE from user WHERE iduser = ?;", i, function (error, result) {
        if (error) console(error);
        res.redirect('/user') // possible aussi avec "render"
    });//Result[0] pour le 1er utilisateur
});

//Launch app to listen to specified port
app.listen(8000, function () {
    console.log("Running on port 8000")
});