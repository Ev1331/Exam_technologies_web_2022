// Import express
let express = require("express");

let app = express();
let liste = [];
let message='';

app.use(express.urlencoded()); //Décoder le messagee
app.use(express.static("public")); //Pour le CSS


liste.push("Faire les courses", "Nourrir le chat");

//let index = 0;

app.get("/", (request, response) => { //ce que l'on fait quand on arrive sur la racine
    //response.send("Hello world")
    response.render("todolist.ejs", { list: liste, message:message }); //(regarde par défaut dans le dossier views)
});


app.post("/", (request, response) => { //le body est décomposé en variables. (request, response) = fonction de callback
    if (request.body.nouvelleTache!=="") { //Si le champ n'est pas vide
    liste.push(request.body.nouvelleTache);
    message = "Tâche ajoutée avec succès";
    response.render("todolist.ejs", { list: liste, message: message}); //Premier: ejs. Second: js
    }
    else{
        message = "Veuillez saisir du texte.";
        response.render("todolist.ejs", { list: liste, message: message});
    }
})


app.get("/delete/:index", (request, response) => {
    liste.splice(request.params.index,1);
    message = "Tâche supprimée"
    response.render("todolist.ejs", {list: liste, message: message});
})


app.listen(80, function () { //écoute sur le port 3000
    console.log("Server is running on port 80")
});