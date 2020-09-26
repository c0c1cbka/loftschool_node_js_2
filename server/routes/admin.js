const express = require('express');

const router = express.Router();
const controllerAdmin = require('../controllers/admin');

router.get('/', controllerAdmin.isAdmin, controllerAdmin.getAdmin);

router.post('/upload', controllerAdmin.isAdmin, controllerAdmin.postUpload);
router.post('/skills', controllerAdmin.isAdmin, controllerAdmin.postSkills);

module.exports = router;