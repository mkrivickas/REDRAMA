import React, { useState, Fragment, useEffect } from 'react';
import IncomesList from './IncomesList';
import EditIncomeForm from './EditIncomeForm';
import Header from './IncomeHeader';
import './IncomeForm.css';
import AddIncomeForm from './AddIncomeForm';

const IncomeForm = () => {
	const [ currentIncome, setCurrentIncome ] = useState({});
	const [ editing, setEditing ] = useState(false);
	const [ incomes, setIncomes ] = useState([]);

	const [ totalIncome, setTotalIncome ] = useState(0);

	useEffect(
		() => {
			let temp = 0;
			for (let i = 0; i < incomes.length; i++) {
				console.log(incomes);
				temp += parseInt(incomes[i].incomeAmount);
			}
			setTotalIncome(temp);
		},
		[ incomes ]
	);

	const fetchData = async () => {
		await fetch('http://localhost:3001/api/v1/income').then((response) => response.json()).then((data) => {
			setIncomes(data.data.incomes);
			console.log(data.data.incomes);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteIncome = async (id) => {
		console.log(id);
		await fetch('http://localhost:3001/api/v1/income/' + id, { method: 'DELETE' }).then(() => {
			// Once posted, the user will be notified
			alert('Your incomes was deleted successfully');
		});

		// /* setEditing(false);

		setIncomes(incomes.filter((income) => income.id !== id));
		fetchData();
	};

	const updateIncome = (id, updatedIncome) => {
		setEditing(false);
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedIncome)
		};
		fetch('http://localhost:3001/api/v1/income/' + id, requestOptions)
			.then((response) => response.json())
			.then(() => {
				// Once posted, the user will be notified
				alert('Your incomes was updated successfully');
			});

		setIncomes(incomes.map((income) => (income._id === id ? updatedIncome : income)));
	};

	const editRow = (income) => {
		setEditing(true);

		setCurrentIncome(income);
	};

	return (
		<div className="income-container">
			<div className="income-row">
				<Header totalIncome={totalIncome} />
				{editing ? (
					<Fragment>
						<EditIncomeForm
							editing={editing}
							setEditing={setEditing}
							currentIncome={currentIncome}
							updateIncome={updateIncome}
						/>
					</Fragment>
				) : (
					<Fragment>
						<div>
							<AddIncomeForm />
						</div>
					</Fragment>
				)}
				<div>
					<IncomesList incomes={incomes} editRow={editRow} deleteIncome={deleteIncome} />
				</div>
			</div>
		</div>
	);
};
export default IncomeForm;
