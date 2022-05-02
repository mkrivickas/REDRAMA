const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String
    }
});

const CategoryModel = new mongoose.model('categories', categorySchema);

module.exports = CategoryModel;
