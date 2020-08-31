const express = require('express');

const router = express.Router();
const controllerIndex = require('../controllers/index');

router.get('/',controllerIndex.getIndex);
router.post('/',controllerIndex.postForm);

module.exports = router;