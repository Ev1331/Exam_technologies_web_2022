let session = require('express-session');
let express = require('express');

exports.pageConnection = function(request, response) {
    response.render('connecterror.ejs');

};


exports.connectSession = function(request, response)  {
        request.session.user = request.body.Pseudo;
        console.log(request.session);
        response.redirect(307, '/confirm');
};