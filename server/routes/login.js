const express = require('express');

const router = express.Router();
const controllerLogin = require('../controllers/login');

router.get('/', controllerLogin.getLogin);
router.post('/',controllerLogin.auth);

module.exports = router;