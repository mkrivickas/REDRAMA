import React, { useState, Fragment, useEffect } from 'react';
import IncomesList from './IncomesList';
import EditIncomeForm from './EditIncomeForm';
import Header from './IncomeHeader';
import './IncomeForm.css';
import AddIncomeForm from './AddIncomeForm';
import Modal from 'react-modal';
import swal from 'sweetalert';

const IncomeForm = () => {
	const [ currentIncome, setCurrentIncome ] = useState({});
	const [ editing, setEditing ] = useState(false);
	const [ incomes, setIncomes ] = useState([]);

	const [ totalIncome, setTotalIncome ] = useState(0);

	const [ modalIsOpen, setIsOpen ] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

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
			swal({
				title: 'Good job!',
				text: 'Jūsų pajamos buvo ištrintos',
				icon: 'success',
				button: 'Aww yiss!'
			});
			// alert('Your incomes was deleted successfully');
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
				swal({
					title: 'Good job!',
					text: 'Jūsų pajamos buvo atnaujintos',
					icon: 'success',
					button: 'Aww yiss!'
				});
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
				<div className="col-12">
					<Header totalIncome={totalIncome} />
					<div className="col-12">
						<button id="AddIncome-button" onClick={openModal}>
							+
						</button>
					</div>
				</div>
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
						<Modal size="sm" className="modal-AddIncome" isOpen={modalIsOpen} onRequestClose={closeModal}>
							<AddIncomeForm />
							{/* <button onClick={closeModal}>close</button> */}
						</Modal>
					</Fragment>
				)}
				<div>
					<IncomesList
						className="IncomesList"
						incomes={incomes}
						editRow={editRow}
						deleteIncome={deleteIncome}
					/>
				</div>
			</div>
		</div>
	);
};
export default IncomeForm;
