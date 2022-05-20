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
		<div>
			<form className="AddIncome-form" onSubmit={handleSubmit}>
				<h3 className="AddIncomeForm-title"> Pridėti pajamas</h3>
				<select defaultValue={""}
					className="AddIncomeForm-input"
					onChange={(e) => {
						setIncomeCategory(e.target.value);
					}}
					required
					name="category"
				>
					<option hidden value={""}>
						-----------
					</option>
					{!isLoading &&
						categories.map(
							(category) =>
								category.categoryType === 'income' && (
									<option key={category._id} value={category.categoryName}>{category.categoryName}</option>
								)
						)}
				</select>
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
