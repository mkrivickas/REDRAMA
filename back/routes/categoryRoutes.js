const express = require('express');

const {
	addCategory, allCategories, deleteCategory
} = require('./../controllers/categoryController');

const router = express.Router();

router.route('/').get(allCategories).post(addCategory).delete(deleteCategory);

module.exports = router;
