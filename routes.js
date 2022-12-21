let express = require('express');
let router = express.Router();

let reservationController = require("./controllers/reservationController");

//Liste des routes vers les contrôleursµ
router.get('/', (req, res) => res.redirect('/home'));

router.get('/home', reservationController.home);
router.post('/savedestination', reservationController.saveDestination);
router.post('/savevoyageurs', reservationController.saveVoyageurs);
router.get('/confirmation', reservationController.confirmReservation);






/*
router.get('/formations', formationController.formationList);

router.post('/panier', panierController.panier);
router.post('/inscription/:num', panierController.panierAdd);
router.post('/desinscription/:num', panierController.panierDelete);
router.post('/confirm', panierController.confirmOrder);

router.post('/login', connectionController.login);
router.post('/error', connectionController.login);

router.post('/connection', connectionController.openSession);
router.post('/connectionerror', connectionController.openSession);
*/



module.exports = router;