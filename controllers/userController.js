let User = require('../models/userModel');

let userList = [];

exports.userList = function (req, res) {
    res.render('userList.ejs', {users : userList});//On renvoie le render (=la vue) avec les paramètres à insérer dans l'ejs
}

exports.userFormAdd = function(req,res){
    res.render('userAdd.ejs', {iduser:'-1', lastname:"", firstname:""} );
}

exports.userNew = function(req,res){
    let iduser = req.body.iduser;
    let lastname = req.body.lastname;
    let firstname = req.body.firstname;

    let user = new User(lastname, firstname); 
    userList.push(user);

    res.redirect('/user');
}