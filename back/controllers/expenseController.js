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

exports.getAllExpense = async (req, res) => {
	try {
		const expense = await ExpenseModel.find();
		res.status(200).json({
			status: 'success',
			results: expense.length,
			data: {
				expense: expense
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
