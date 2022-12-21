//Connection à MySQL
let Item = require('../models/itemModel');

var mysql = require("mysql");
const { render } = require('ejs');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "products",
});
connection.connect(function (error) { if (error) console.log(error); });

let itemList = [];

// Récupération de la lste des formations MySQL dans une liste
connection.query("select * from shoppingitems", function (error, result) {
    if (error) console(error);
    for (let a = 0; a < result.length; a++) {
        console.log(result)
        let item = new Item(result[a].id_item, result[a].name, result[a].quantity, result[a].purchased);
        itemList.push(item);
    }
});

exports.shop = function (req, res) {
    res.render('../views/shop.ejs', { itemList: itemList });
    console.log('EXPORT !')
    console.log(itemList);
}


exports.addItem = function (req, res) {

}

exports.newItem = function (req, res) {
    res.render('../views/addItem.ejs');
}

exports.saveItem = function (req, res) {
    let item = {"id_item": req.body.id_item, "name": req.body.name, "quantity": req.body.quantity };
    connection.query("INSERT INTO shoppingitems SET ?", item, function (err, result) {
        if (err) console.log(err);
        res.render('/views/shop.ejs');
    });
}
   

exports.deleteItem = function (req, res) {
    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].id_item == req.params.num) {
            itemList.splice(i,1);
        }
    }
    res.render('../views/shop.ejs', {itemList : itemList});
};


/* 

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
    for (let i = 0; i < formationList; i++) {
        console.log(inscriptions[i].ID);
        console.log(req.params.num);
        if (inscriptions[i].ID == req.params.num) {
            console.log("boucle\n\n");
            inscriptions.splice(inscriptions.indexOf(inscriptions[i]));
            console.log(inscriptions);
            console.log(i);
        }
        break;
    }
    //console.log(i);
    //res.render('../views/panier.ejs', {formationList : inscriptions});
    res.redirect('/');
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

*/