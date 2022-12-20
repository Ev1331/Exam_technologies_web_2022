let Formation = require('../models/formationModel');

let formationList = [];

var mysql = require("mysql");
//Database connection

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "users",
});
connection.connect(function (error) { if (error) console.log(error); });


// Récupération de la lste des formations MySQL dans une liste formationList
connection.query("select * from formation", function (error, result) {
        if (error) console(error);
        for( let index=0; index < result.length; index++ ) {
            let formation = new Formation(result[index].ID, result[index].Nom, result[index].Prix, result[index].DateDebut, result[index].DateFin);
            formationList.push(formation);
            //console.log(formationList);
        }
    });



exports.formationList = function (req, res) {
    res.render('../views/formations.ejs', {formationList : formationList});//On renvoie le render (=la vue) avec les paramètres à insérer dans l'ejs
}