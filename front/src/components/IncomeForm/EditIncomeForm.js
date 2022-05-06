import React, { useState, useEffect } from 'react';
import './EditIncomeForm.css';

const validIncomeAmount = new RegExp('^[0-9.]{1,10}?$');

const EditIncomeForm = (props) => {
	const [ income, setIncome ] = useState(props.currentIncome);
	const [ editName, setEditName ] = useState(props.currentIncome.Name);
	const [ editAmount, setEditAmount ] = useState(props.currentIncome.Amount);
	let maxDate = new Date();
	let isIncomeValid = true;
	const [ editDate, setEditDate ] = useState(props.currentIncome.Date.split('T')[0]);

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
			Name: editName,
			Amount: editAmount,
			Date: editDate,
			Type: 'pajamos'
		};
		props.updateIncome(income._id, updatedIncome);
	};

	const editingAmount = (e) => {
		isIncomeValid = true;
		e.target.setCustomValidity('');
		console.log(validIncomeAmount.test(e.target.value));
		if (!validIncomeAmount.test(e.target.value)) {
			isIncomeValid = false;
			e.target.setCustomValidity(
				'Suma negali būti ilgesnė nei 10 simbolių ir po kablelio gali būti tik 2 simboliai'
			);
		}
		setEditAmount(e.target.value);
	};

	return (
		<div className="EditIcomesForm-container">
			<form className="EditIncome-form" onSubmit={handleSubmit}>
				<h3 className="EditIncomeForm-title "> Atnaujinti pajamas</h3>
				<div>
					<select className="AddIncomeForm-input" name="category">
						<option value="-Program-">-Kategorija-</option>
						<option value="JavaScript">JavaScript</option>
						<option value="Java">Java</option>
						<option value="PHP">PHP</option>
						<option value="Programinės įrangos testuotjas">Programinės įrangos testuotjas</option>
					</select>
				</div>
				<div>
					<input
						className="EditIncomeForm-input"
						type="number"
						min="0.01"
						step="0.01"
						name="incomeAmount"
						required
						placeholder="Suma"
						value={editAmount}
						onChange={(e) => {
							editingAmount(e);
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
