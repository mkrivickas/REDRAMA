const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
    },
    expenseAmount: {
        type: String,
    },
    expenseDate: {
        type: String,
    },
    expenseCategory: {
        type: String,
    },
});

const ExpenseModel = new mongoose.model('expenses', expenseSchema);

module.exports = ExpenseModel;
