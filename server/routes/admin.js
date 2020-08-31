const express = require('express');

const router = express.Router();
const controllerAdmin = require('../controllers/admin');

router.get('/',controllerAdmin.getAdmin);

router.post('/upload',controllerAdmin.postUpload);
router.post('/skills',controllerAdmin.postSkills);

module.exports = router;