let express = require('express');
let router = express.Router();

let formationController = require("./controllers/formationController");
let panierController = require("./controllers/panierController")
let connectionController = require("./controllers/connectionController");

//Liste des routes vers les contrôleursµ
router.get('/', (req, res) => res.redirect('/formations'));


router.get('/formations', formationController.formationList);

router.post('/panier', panierController.panier);
router.post('/inscription/:num', panierController.panierAdd);
router.post('/desinscription/:num', panierController.panierDelete);
router.post('/confirm', panierController.confirmOrder);

router.post('/login', connectionController.login);
router.post('/error', connectionController.login);

router.post('/connection', connectionController.openSession);
router.post('/connectionerror', connectionController.openSession);




module.exports = router;