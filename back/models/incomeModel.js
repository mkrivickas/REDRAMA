const mongoose = require('mongoose');
/* const Date = {
	timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}; */

// DB schema
const incomesSchema = new mongoose.Schema({
	incomeName: {
		type: String
	},
	incomeAmount: {
		type: Number
	},
	incomeDate: {
		type: Date
	}
});

// Modelis DB lentelės pavadinimas
const Incomes = new mongoose.model('Incomes', incomesSchema);

//Duomenų siuntimas į DB

const testIncomes = new Incomes({
	incomeName: 'Alga',
	incomeAmount: '1000',
	incomeDate: '1999-01-01'
});

testIncomes.save().then(() => console.log(testIncomes));

module.exports = Incomes;
