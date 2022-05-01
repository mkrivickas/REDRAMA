import React, { useState } from 'react';
import './AddIncomeForm.css';
import swal from 'sweetalert';

const AddIncomeForm = (props) => {
	const [ incomeName, setincomeName ] = useState();
	const [ incomeAmount, setincomeAmount ] = useState();
	let maxDate = new Date;
	const [ incomeDate, setincomeDate ] = useState(maxDate.toLocaleDateString('en-CA'));
	/* const [maxDate, setMaxDate] = useState(Date) */
	console.log(maxDate.toLocaleDateString('en-ZA'))
	const handleSubmit = (e) => {
		e.preventDefault();
		let incomeNameFirstLetter = incomeName[0].toUpperCase();
		let upperCaseIncomeName = incomeNameFirstLetter + incomeName.slice(1);

		props.addIncome({incomeName: upperCaseIncomeName, incomeAmount: incomeAmount, incomeDate: incomeDate})
	};

	// You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]
	function incomeNameAdd(e) {
		// Dealing with name field changes to update our state
		setincomeName(e.target.value);
	}
	const incomeAmountAdd = (e) => {
		setincomeAmount(e.target.value);
	};

	const incomeDateAdd = (e) => {
		setincomeDate(e.target.value);
	};

	return (
		<div>
			<form className="AddIncome-form" onSubmit={handleSubmit}>
				<h3 className="AddIncomeForm-title"> Pridėti pajamas</h3>
				<div>
					<input
						className="AddIncomeForm-input"
						type="text"
						name="incomeName"
						required
						maxLength="20"
						minLength="3"
						placeholder="Pajamų pavadinimas"
						pattern="^[\p{L},.0-9\s-]+$"
						onChange={incomeNameAdd}
					/>
				</div>
				<div>
					<input
						className="AddIncomeForm-input"
						type="number"
						// pattern="[1-9]{,6}"
						max="9999999"
						min="0.01"
						step="0.01"
						name="incomeAmount"
						required
						placeholder="Suma"
						onChange={incomeAmountAdd}
					/>
				</div>
				<div>
					<input
						className="AddIncomeForm-input"
						type="date"
						name="incomeDate"
						required
						min="2019-01-01"
						max={maxDate.toLocaleDateString('en-CA')}
						placeholder="MMMM-mm-dd"
						onChange={incomeDateAdd}
						value={incomeDate}
					/>
				</div>
				<button id="button-incomeAdd" type="submit">
					{' '}
					Pridėti
				</button>
			</form>
		</div>
	);
};

export default AddIncomeForm;
