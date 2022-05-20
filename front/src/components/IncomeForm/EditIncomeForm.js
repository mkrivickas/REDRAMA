import React, { useState, useEffect } from 'react';
import './EditIncomeForm.css';

const validIncomeAmount = new RegExp('^[0-9.]{1,10}?$');

const EditIncomeForm = (props) => {
	const [ income, setIncome ] = useState(props.currentIncome);
	const [ editName, setEditName ] = useState(props.currentIncome.Name);
	const [ editAmount, setEditAmount ] = useState(props.currentIncome.Amount);
	const [editCategory, setEditCategory] = useState(props.currentIncome.Category)
	let maxDate = new Date();
	let isIncomeValid = true;
	const [ editDate, setEditDate ] = useState(props.currentIncome.Date.split('T')[0]);

	let [categories, setCategories] = useState("")
    let [isLoading, setIsLoading] = useState(true)


	
    function fetchCategories(){
        fetch('http://localhost:3001/api/v1/category/')
            .then(response => response.json())
            .then(data => {
            setCategories(data.data.categories);
            setIsLoading(false);
            console.log(categories)
            
            });
    }

	useEffect(() => {
		fetchCategories();
	}, [])

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
			Type: 'income',
			Category: editCategory
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
		<div className="EditIncomesForm-container">
			<form className="EditIncome-form" onSubmit={handleSubmit}>
				<h3 className="EditIncomeForm-title "> Atnaujinti pajamas</h3>
				<div>
					<select className="AddIncomeForm-input" value={editCategory} onChange={(e)=>{setEditCategory(e.target.value)}} required name="category">
						
					<option selected="true" hidden value="">-----------</option>
                            {!isLoading &&
                            categories.map((category)=>(
                                category.categoryType ==="income"&&
                                    <option value={category.categoryName}>{category.categoryName}</option>
                            ))}
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
