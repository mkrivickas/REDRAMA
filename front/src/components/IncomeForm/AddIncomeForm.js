import React, { useState } from 'react';
import './AddIncomeForm.css';
import swal from 'sweetalert';

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
		})
			.then((response) => response.json())
			.then(() => {
				// Once posted, the user will be notified
				swal({
					title: 'Puiku!',
					text: 'Jūsų pajamos buvo pridėtos',
					icon: 'success',
					button: 'Gerai!'
				});
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
						onChange={incomeNameAdd}
					/>
				</div>
				<div>
					<input
						className="AddIncomeForm-input"
						type="number"
						min="0.01"
						step="0.01"
						name="incomeAmount"
						required
						maxLength="7"
						minLength="1"
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
						max="2099-12-31"
						placeholder="MMMM-mm-dd"
						onChange={incomeDateAdd}
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
