import React, { useState, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import './EditExpenseForm.css';

const EditExpenseForm = (props) => {
    const [expense, setExpense] = useState(props.currentExpense);
    const [editName, setEditName] = useState(props.currentExpense.expenseName);
    const [editAmount, setEditAmount] = useState(
        props.currentExpense.Amount
    );
    let maxDate = new Date();
    const [editDate, setEditDate] = useState(
        props.currentExpense.Date.split('T')[0]
    );

	useEffect(
		() => {
			setExpense(props.currentExpense);
		},
		[ props ]
	);

	const handleSubmit = (e) => {
		console.log(expense);
		e.preventDefault();
		let updatedExpense = {
			_id: expense._id,
			expenseName: editName,
			expenseAmount: editAmount,
			expenseDate: editDate
		};
		props.updateExpense(expense._id, updatedExpense);
	};

	return (
		<div className="EditExpenseForm-container">
			<form className="EditExpense-form" onSubmit={handleSubmit}>
				<h3 className="EditExpenseForm-title "> Atnaujinti pajamas</h3>
				<div>
					<input
						className="EditExpenseForm-input"
						type="text"
						name="expenseName"
						required
						maxLength="20"
						minLength="3"
						placeholder="Išlaidų pavadinimas"
						pattern="^[\p{L},.0-9\s-]+$"
						value={editName}
						onChange={(e) => {
							setEditName(e.target.value);
						}}
					/>
				</div>
				<div>
					<input
						className="EditExpenseForm-input"
						type="number"
						max="9999999"
						min="0.01"
						step="0.01"
						name="expenseAmount"
						maxLength="5"
						required
						placeholder="Suma"
						pattern="/^(\d){0,8}(.){0,1}(\d){0,2}$/"
						value={editAmount}
						onChange={(e) => {
							setEditAmount(e.target.value);
						}}
					/>
				</div>
				<div>
					<input
						className="EditExpenseForm-input"
						type="date"
						name="expenseDate"
						required
						min="2019-01-01"
						max={maxDate.toLocaleDateString('lt-LT')}
						placeholder="MMMM-mm-dd"
						value={editDate}
						onChange={(e) => {
							setEditDate(e.target.value);
						}}
					/>
				</div>
				<div>
					<button id="button-expenseUpdate">Atnaujinti išlaidas</button>
				</div>
				<button id="button-expenseCancel" onClick={() => props.setEditing(false)}>
					Atšaukti
				</button>
			</form>
			<div className="ExpenseListContainer">
				<ExpenseList
					className="ExpenseList"
					expense={expense}
					// editRow={editRow}
					// deleteIncome={deleteIncome}
				/>
			</div>
		</div>
	);
};

export default EditExpenseForm;
