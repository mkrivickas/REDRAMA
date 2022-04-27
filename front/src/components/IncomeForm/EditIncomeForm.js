import React, { useState, useEffect } from 'react';
import './EditIncomeForm.css';

const EditIncomeForm = (props) => {
	const [ income, setIncome ] = useState(props.currentIncome);
	const [ editName, setEditName ] = useState(props.currentIncome.incomeName);
	const [ editAmount, setEditAmount ] = useState(props.currentIncome.incomeAmount);
	const [ editDate, setEditDate ] = useState(props.currentIncome.incomeDate);

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
				<h3 className="EditIncomeForm-title "> Pridėti pajamas</h3>

				<div>
					<input
						className="EditIncomeForm-input"
						type="text"
						name="incomeName"
						required
						maxLength="40"
						minLength="3"
						placeholder="Pajamų pavadinimas"
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
						min="0.01"
						step="0.01"
						name="incomeAmount"
						required
						maxLength="7"
						minLength="1"
						placeholder="income Amount"
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
						min="2022-01-01"
						max="2099-01-01"
						placeholder="MMMM-mm-dd"
						value={editDate}
						onChange={(e) => {
							setEditDate(e.target.value);
						}}
					/>
				</div>
				<div>
					<button id="button-incomeUpdate">Pakeisti pajamas</button>
				</div>
				<button id="button-incomeCancel" onClick={() => props.setEditing(false)}>
					Atšaukti
				</button>
			</form>
		</div>
	);
};

export default EditIncomeForm;
