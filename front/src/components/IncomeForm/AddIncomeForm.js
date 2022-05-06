import React, { useState } from 'react';
import './AddIncomeForm.css';
// import swal from 'sweetalert';

const validIncomeAmount = new RegExp('^[0-9.]{1,10}?$');

const AddIncomeForm = (props) => {
	const [ incomeName, setincomeName ] = useState();
	const [ incomeAmount, setincomeAmount ] = useState();
	let maxDate = new Date();
	let isIncomeValid = true;
	const [ incomeDate, setincomeDate ] = useState(maxDate.toLocaleDateString('lt-LT'));
	let addIncomeForm = document.getElementById('addIncomeFormInput');

	/* const [maxDate, setMaxDate] = useState(Date) */
	/* console.log(maxDate.toLocaleDateString('lt-LT')) */
	const handleSubmit = (e) => {
		console.log(incomeName)
		if(incomeName === "   "){
			console.log("is empty")
		}
		e.preventDefault();
		let incomeNameFirstLetter = incomeName[0].toUpperCase();
		let upperCaseIncomeName = incomeNameFirstLetter + incomeName.slice(1);
		console.log('bonk');
		if (isIncomeValid) {
			console.log('bonk');
			props.addIncome({ Name: upperCaseIncomeName, Amount: incomeAmount, Date: incomeDate, Type: 'pajamos' });
		}
	};

	function incomeNameAdd(e) {
		setincomeName(e.target.value);
	}
	const incomeAmountAdd = (e) => {
		isIncomeValid = true;
		addIncomeForm.setCustomValidity('');
		console.log(validIncomeAmount.test(e.target.value));
		if (!validIncomeAmount.test(e.target.value)) {
			isIncomeValid = false;
			addIncomeForm.setCustomValidity(
				'Suma negali būti ilgesnė nei 10 simbolių ir po kablelio gali būti tik 2 simboliai'
			);
		}
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
					<div className="col-lg-6 col-md-12 col-sm-12">
						<select className="AddIncomeForm-input" name="category">
							<option value="-Program-">-Kategorija-</option>
							<option value="JavaScript">JavaScript</option>
							<option value="Java">Java</option>
							<option value="PHP">PHP</option>
							<option value="Programinės įrangos testuotjas">Programinės įrangos testuotjas</option>
						</select>
					</div>
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
						id="addIncomeFormInput"
						className="AddIncomeForm-input"
						type="number"
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
						max={maxDate.toLocaleDateString('lt-LT')}
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
