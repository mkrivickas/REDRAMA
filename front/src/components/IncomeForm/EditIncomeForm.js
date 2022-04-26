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
		<form className="EditIncome-form" onSubmit={handleSubmit}>
			<h3 className="incomeEdit-title"> Edit income</h3>
			<div>
				<input
					className="income-input"
					type="text"
					name="incomeName"
					required
					maxLength="20"
					minLength="2"
					placeholder="income Name"
					value={editName}
					onChange={(e) => {
						setEditName(e.target.value);
					}}
				/>
			</div>
			<div>
				<input
					className="income-input"
					type="number"
					name="incomeAmount"
					required
					maxLength="20"
					placeholder="income Amount"
					value={editAmount}
					onChange={(e) => {
						setEditAmount(e.target.value);
					}}
				/>
			</div>
			<div>
				<input
					className="income-input"
					type="date"
					name="incomeDate"
					required
					min="1920-01-01"
					max="2021-01-01"
					placeholder="MMMM-mm-dd"
					value={editDate}
					onChange={(e) => {
						setEditDate(e.target.value);
					}}
				/>
			</div>
			<button id="button-incomeUpdate">Update income</button>
			<button id="button-incomeCancel" onClick={() => props.setEditing(false)}>
				Cancel
			</button>
		</form>
	);
};

export default EditIncomeForm;
