const ExpenseModel = require('./../models/expenseModel');

exports.addExpense = async (req, res) => {
    try {
        const newExpense = await ExpenseModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                expense: newExpense,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
