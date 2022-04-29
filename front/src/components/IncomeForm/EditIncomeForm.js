import React, { useState, useEffect } from 'react';
import './EditIncomeForm.css';

const EditIncomeForm = (props) => {
	const [ income, setIncome ] = useState(props.currentIncome);
	const [ editName, setEditName ] = useState(props.currentIncome.incomeName);
	const [ editAmount, setEditAmount ] = useState(props.currentIncome.incomeAmount);
	let maxDate = new Date;
	const [ editDate, setEditDate ] = useState(props.currentIncome.incomeDate.split("T")[0]);

	useEffect(
		() => {
			setIncome(props.currentIncome);
		},
		[ props ]
	);

	const handleSubmit = (e) => {
		console.log(income);
		e.preventDefault();
		let updatedIncome = {
			_id: income._id,
			incomeName: editName,
			incomeAmount: editAmount,
			incomeDate: editDate
		};
		props.updateIncome(income._id, updatedIncome);
	};

	return (
		<div className="EditIcomesForm-container">
			<form className="EditIncome-form" onSubmit={handleSubmit}>
				<h3 className="EditIncomeForm-title "> Atnaujinti pajamas</h3>

				<div>
					<input
						className="EditIncomeForm-input"
						type="text"
						name="incomeName"
						required
						maxLength="20"
						minLength="3"
						placeholder="Pajamų pavadinimas"
						pattern="^[\p{L},.0-9\s-]+$"
						value={editName}
						onChange={(e) => {
							setEditName(e.target.value);
						}}
					/>
				</div>
				<div>
					<input
						className="EditIncomeForm-input"
						type="number"
						max="9999999"
						min="0.01"
						step="0.01"
						name="incomeAmount"
						maxLength="5"
						required
						placeholder="Suma"
						value={editAmount}
						onChange={(e) => {
							setEditAmount(e.target.value);
						}}
					/>
				</div>
				<div>
					<input
						className="EditIncomeForm-input"
						type="date"
						name="incomeDate"
						required
						min="2019-01-01"
						max={maxDate.toLocaleDateString('en-CA')}
						placeholder="MMMM-mm-dd"
						value={editDate}
						onChange={(e) => {
							setEditDate(e.target.value);
						}}
					/>
				</div>
				<div>
					<button id="button-incomeUpdate">Atnaujinti pajamas</button>
				</div>
				<button id="button-incomeCancel" onClick={() => props.setEditing(false)}>
					Atšaukti
				</button>
			</form>
		</div>
	);
};

export default EditIncomeForm;
