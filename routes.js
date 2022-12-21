let express = require('express');
let router = express.Router();

let shopController = require("./controllers/shopController");

//Liste des routes vers les contrôleursµ
router.get('/', (req, res) => res.redirect('/boutique'));


router.get('/boutique', shopController.shop);

//router.post('/ajouter/:num', shopController.addItem);
router.post('/retirer/:num', shopController.deleteItem);
router.post('/nouveau', shopController.newItem);
router.post('/sauver', shopController.saveItem);



//router.post('/ajouter', shopController.addItem);

/*
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