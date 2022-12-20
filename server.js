app.use(express.static("public"));

const { query } = require("express");
let express = require("express");

let app = express();

app.get("/", (request, response) => { //ce que l'on fait quand on arrive sur la racine
    //response.send("Hello world")
    response.render("home.ejs", { name: "Evrard" }); //(regarde par défaut dans le dossier views)
});

//using URL
app.get("/index", (request, response) => {
    response.send("Bonjour " + request.query.name); //localhost:3000/index?name=Evrard
})

//Using param
app.get("/index/:name", (request, response) => {
    response.send("Bonjour " + request.params.name); //localhost:3000/index/Evrard
})


app.listen(3000, function () { //écoute sur le port 3000
    console.log("Server is running on port 3000")
});


//Moteur de template ejs