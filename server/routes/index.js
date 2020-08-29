const express = require('express');

const router = express.Router();
const controllerIndex = require('../controllers/index');
const controllerLogin = require('../controllers/login');
//const controllerAdmin = require('../controllers/admin');

router.get('/',controllerIndex.getIndex);
router.post('/',controllerIndex.postIndex);

router.get('/login',controllerLogin.getLogin);
router.post('/login',controllerLogin.auth);

module.exports = router;