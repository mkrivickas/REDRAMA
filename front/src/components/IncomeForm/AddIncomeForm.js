import React, { useState } from 'react';

const AddIncomeForm = (props) => {
	const [ incomeName, setincomeName ] = useState();
	const [ incomeAmount, setincomeAmount ] = useState();
	const [ incomeDate, setincomeDate ] = useState();

	const handleSubmit = (e) => {
		let incomeNameFirstLetter = incomeName[0].toUpperCase();
		let upperCaseIncomeName = incomeNameFirstLetter + incomeName.slice(1);

		console.log(incomeName);
		// Once the form has been submitted, this function will post to the backend
		const postURL = 'http://localhost:3001/api/v1/income/'; //Our previously set up route in the backend
		fetch(postURL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				// We should keep the fields consistent for managing this data later
				incomeName: upperCaseIncomeName,
				incomeAmount: incomeAmount,
				incomeDate: incomeDate
			})
		}).then(() => {
			// Once posted, the user will be notified
			alert('Your incomes was added successfully');
		});
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
				<h3 className="incomeAdd-title"> Add income</h3>
				<div>
					<input
						className="income-input"
						type="text"
						name="incomeName"
						required
						maxLength="40"
						minLength="3"
						placeholder="Income Name"
						/* 						pattern="[A-Za-z]" */
						onChange={incomeNameAdd}
					/>
				</div>
				<div>
					<input
						className="income-input"
						type="number"
						min="0.01"
						step="0.01"
						name="incomeAmount"
						required
						maxLength="7"
						minLength="1"
						placeholder="Income Amount"
						onChange={incomeAmountAdd}
					/>
				</div>
				<div>
					<input
						className="income-input"
						required
						type="date"
						name="incomeDate"
						// min="2022-01-01"
						// max="2099-01-01"
						placeholder="YYYY-MM-DD"
						onChange={incomeDateAdd}
					/>
				</div>
				<button id="button-incomeAdd" type="submit">
					{' '}
					Add
				</button>
			</form>
		</div>
	);
};

export default AddIncomeForm;
