let session = require('express-session');
let express = require('express');

exports.login = function(request, response) {
    response.render('connexion.ejs');
};

exports.openSession = function(request, response)  {
        request.session.user = request.body.nom;
        response.redirect('/');
};