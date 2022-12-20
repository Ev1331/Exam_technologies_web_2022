
let Formation = require('../models/formationModel');

//Connection à MySQL
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "users",
});
connection.connect(function (error) { if (error) console.log(error); });

let formationList = [];
let inscriptions = [];
let panier = [];

//Ajouter formation au panier

/*
let formation = {"Nom":req.body.Nom};
connection.query("INSERT INTO panier SET ?", formation, function (err, result) {
    if (err) console.log(err);
    res.redirect('/');
});
*/


// Récupération de la lste des formations MySQL dans une liste formationList
connection.query("select * from formation", function (error, result) {
    if (error) console(error);
    for (let a = 0; a < result.length; a++) {
        let formation = new Formation(result[a].ID, result[a].Nom, result[a].Prix, result[a].DateDebut, result[a].DateFin);
        formationList.push(formation);
    }
});


exports.panier = function (req, res) {
    res.render('../views/panier.ejs', { formationList: inscriptions });//On renvoie le render (=la vue) avec les paramètres à insérer dans l'ejs
}


exports.panierAdd = function (req, res) {
    if (!inscriptions.includes(formationList[req.params.num - 1])) { //Si ce n'est pas déjà le cas, la formation est ajoutée dans les inscriptions
        inscriptions.push(formationList[req.params.num - 1]);
        res.redirect('/');
    }
};


exports.panierDelete = function (req, res) {
    console.log(inscriptions)
    console.log(formationList)
    console.log("----- FOR -----")
    //inscriptions.splice(inscriptions[i],1);
    for (let i = 0; i < inscriptions.length; i++) {
        console.log("i")
        console.log(i)
        console.log("inscriptions[i].ID")
        console.log(inscriptions[i].ID);
        console.log("req.params.num")
        console.log(req.params.num);
        if (inscriptions[i].ID == req.params.num) {
            console.log("boucle\n\n");
            inscriptions.splice(i,1);
            console.log(inscriptions);
            console.log(i);
        }
    }
    //console.log(i);
    res.render('../views/panier.ejs', {formationList : inscriptions});
    //res.redirect('/');
};



exports.panierShow = function (req, res) {
    let message = ""
    for (let i = 0; i < formationList.length; i++) {
        if (inscriptions.includes(formationList[i].ID)) {
            if (!panier.includes(formationList[i])) {
                panier.push(formationList[i]);
            };
            ;
        };
        res.render('panier.ejs', { formations: panier, message: message });
    };
};


exports.confirmOrder = function (req, res) {
    let currentUser = req.session.user;
    if (currentUser == undefined) {
        //console.log("redirect");
        res.render('erreur.ejs');
    };
    if (currentUser != undefined) {
        //message = "enregistrement réussi"
        for (let i = 0; i < inscriptions.length; i++) {
            connection.query("INSERT INTO inscriptions(utilisateur, IDformation) VALUES(?, ?)  ", [currentUser, inscriptions[i]], function (error, result) {
                if (error) console.log(error);
                else console.log(currentUser + inscriptions);
            });
            res.render('panier.ejs', { formations: panier, message: message })
        };
        inscriptions = [];
        panier = [];
    };
};