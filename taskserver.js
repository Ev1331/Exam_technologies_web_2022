// Import express
let express = require("express");

//Initialize the app
let app = express();

app.use(express.urlencoded({ extended: true })) //Pour pouvoir décoder le body
app.use(express.static("public")); //Pour le CSS

var mysql = require("mysql");
//Database connection

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "users",
});
connection.connect(function (error) { if (error) console.log(error); });

//      URL par défaut          /
app.get('/', (req, res) => {
    res.send("It's working !");
});

//      Liste des tâches        /task
app.get("/task", (req, res) => {
    connection.query("select * from task", function (error, result) {
        if (error) console(error);
        res.render("taskList.ejs", { tasks: result });
    });
});


//      Vers nouvelle tâche         /task/add
app.get('/task/add', (req, res) => {
    res.render("taskAdd.ejs");
});


//      Tâche dans la DB
app.post("/task", (req, res) => {
    let task = { "taskname": req.body.taskname };
    connection.query("INSERT INTO task SET ?", task, function (err, result) {
        if (err) console.log(err);
        res.redirect('/task');
    });
});


//      Supprimer une tâche        /task/delete/i
app.get('/task/delete/:i', (req, res) => {
    let i = req.params.i;
    connection.query("DELETE from task WHERE idtask = ?;", i, function (error, result) {
        if (error) console(error);
        res.redirect('/task') // possible aussi avec "render"
    });//Result[0] pour le 1er utilisateur
});

//Launch app to listen to specified port
app.listen(8000, function () {
    console.log("Running on port 8000")
});