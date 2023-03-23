const express = require('express');
const router = express.Router()
const articlesController = require('../controller/articlesController');

router.get('/', articlesController.getAllData);
router.post('/', articlesController.postData);
router.get('/:id', articlesController.getDataById);
router.put('/:id', articlesController.updateData);
router.delete('/:id', articlesController.deleteData);

module.exports = router;