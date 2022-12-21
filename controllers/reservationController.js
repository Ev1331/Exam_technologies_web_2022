const Reservation = require("../models/reservationModel");
const Voyageur = require("../models/voyageurModel");

let listeVoyageurs = [];
let listeAges = [];
let listeNoms = [];
let listeReservations = [];
let assurance;

// ----------------- Connection MySQL -----------------

var mysql = require("mysql");
const { render } = require('ejs');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "examen",
});
connection.connect(function (error) { if (error) console.log(error); });


// -----------------------------------------------------


exports.home = function (req, res) {
    res.render('../views/home.ejs', {});//On renvoie le render (=la vue) avec les paramètres à insérer dans l'ejs
}

exports.saveDestination = function (req, res) {
    /*
    if (req.body.assurance == 'on') {
        assurance = 1;
    }
    else {
        assurance = 0;
    }
    */
    let reservation = new Reservation(req.body.destination, req.body.nbseat, req.body.assurance);
    console.log(reservation);
    listeReservations.push(reservation);
    res.render('../views/person.ejs', { reservation: reservation, listeNoms: listeNoms, listeAges: listeAges });
}

exports.saveVoyageurs = function (req, res) {
    listeNoms = req.body.name;
    listeAges = req.body.age;

    for (let i = 0; i < listeNoms.length; i++) {
        let voyageur = new Voyageur(listeNoms[i], listeAges[i]);
        listeVoyageurs.push(voyageur);
    }
    console.log(listeVoyageurs);
    res.render('../views/validation.ejs', { listeVoyageurs: listeVoyageurs, reservation: listeReservations[0] });
}



exports.confirmReservation = function (req, res) {
    let reservation = { "destination": listeReservations[0].destination, "nbseat": listeReservations[0].nbseat, "assurance": listeReservations[0].assurance };
    connection.query("INSERT INTO reservation SET ?", reservation, function (err, result) {
        if (err) console.log(err);
    });

    for( let i = 0; i < reservation.nbseat; i++ ){
    let person = { "name": listeVoyageurs[i].nom, "age": listeVoyageurs[i].age};
    connection.query("INSERT INTO voyageurs SET ?", person, function (err, result) {
        if (err) console.log(err);
    });
}

    res.render('../views/confirmation.ejs', {});
}