import React, { useState, useEffect } from 'react';
import './AddIncomeForm.css';
// import swal from 'sweetalert';

const validIncomeAmount = new RegExp('^[0-9.]{1,10}?$');

const AddIncomeForm = (props) => {
	const [ incomeName, setincomeName ] = useState();
	const [ incomeAmount, setincomeAmount ] = useState();
	let maxDate = new Date();
	let isIncomeValid = true;
	const [ incomeDate, setincomeDate ] = useState(maxDate.toLocaleDateString('lt-LT'));
	const [ incomeCategory, setIncomeCategory ] = useState('');
	let addIncomeForm = document.getElementById('addIncomeFormInput');

	let [ categories, setCategories ] = useState('');
	let [ isLoading, setIsLoading ] = useState(true);

	function fetchCategories() {
		fetch('http://localhost:3001/api/v1/category/').then((response) => response.json()).then((data) => {
			setCategories(data.data.categories);
			setIsLoading(false);
		});
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleSubmit = (e) => {
		console.log(incomeName);
		if (incomeName === '   ') {
			console.log('is empty');
		}
		e.preventDefault();
		let incomeNameFirstLetter = incomeName[0].toUpperCase();
		let upperCaseIncomeName = incomeNameFirstLetter + incomeName.slice(1);
		console.log('bonk');
		if (isIncomeValid) {
			props.addIncome({
				Name: upperCaseIncomeName,
				Amount: incomeAmount,
				Date: incomeDate,
				Category: incomeCategory,
				Type: 'income',
				UserId: props.currentUser._id
			});
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
		<div className="AddIncomesForm container">
			<form className="AddIncome-form row" onSubmit={handleSubmit}>
				<h3 className="AddIncomeForm-title col-lg-12 col-md-12 col-sm-12"> Pridėti pajamas</h3>
				<div className="col-lg-6 col-md-12 col-sm-12 incomeAddForm">
					<select
						className="AddIncomeForm-input"
						onChange={(e) => {
							setIncomeCategory(e.target.value);
						}}
						required
						name="category"
					>
						<option selected="true" hidden value="">
							Pajamų kategorija
						</option>
						{!isLoading &&
							categories.map(
								(category) =>
									category.categoryType === 'income' && (
										<option value={category.categoryName}>{category.categoryName}</option>
									)
							)}
					</select>
				</div>
				<div className="col-lg-6 col-md-12 col-sm-12 incomeAddForm">
					<input
						id="addIncomeFormInput-suma"
						className="AddIncomeForm-input"
						type="number"
						min="0.01"
						step="0.01"
						name="incomeAmount"
						required
						placeholder="Pajamų suma, €"
						onChange={incomeAmountAdd}
					/>
				</div>
				<div className="col-lg-6 col-md-12 col-sm-12 incomeAddForm">
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
				<div className="col-lg-6 col-md-12 col-sm-12 incomeAddForm">
					<input
						id="incomeTitle"
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
				<div className="col-lg-3 col-md-12 col-sm-12">
					<button id="button-incomeAdd" type="submit">
						{' '}
						Pridėti
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddIncomeForm;
