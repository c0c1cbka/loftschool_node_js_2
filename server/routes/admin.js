const express = require('express');

const router = express.Router();
const controllerAdmin = require('../controllers/admin');

router.get('/',controllerAdmin.getAdmin);

module.exports = router;