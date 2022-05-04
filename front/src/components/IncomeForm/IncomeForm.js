import React, { useState, Fragment, useEffect } from 'react';
import IncomesList from './IncomesList';
import EditIncomeForm from './EditIncomeForm';
import Header from './IncomeHeader';
import './IncomeForm.css';
import AddIncomeForm from './AddIncomeForm';
import Modal from 'react-modal';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

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
				temp += parseInt(incomes[i].incomeAmount);
			}
			setTotalIncome(temp);
		},
		[ incomes ]
	);

	const fetchData = async () => {
		await fetch('http://localhost:3001/api/v1/income').then((response) => response.json()).then((data) => {
			setIncomes(data.data.incomes);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteIncome = async (id) => {
		console.log(id);
		Swal.fire({
			title: 'Ar esate tikri?',
			text: 'Dėmesio duomenys bus pašalinti!',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'Atšaukti',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Taip, pašalinti!'
		}).then(async (result) => {
			if (result.isConfirmed) {
				await fetch('http://localhost:3001/api/v1/income/' + id, { method: 'DELETE' }).then(() => {
					setIncomes(incomes.filter((income) => income.id !== id));
					fetchData();
					Swal.fire({
						title: 'Jūsų duomenys buvo pašalinti!',
						icon: 'success',
						confirmButtonText: 'Gerai'
					});
				});
			}
		});
		// alert('Your incomes was deleted successfully');

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
					title: 'Puiku!',
					text: 'Jūsų duomenys buvo atnaujinti',
					icon: 'success',
					button: 'Gerai!'
				});
			});

		setIncomes(incomes.map((income) => (income._id === id ? updatedIncome : income)));
	};

	const editRow = (income) => {
		setEditing(true);

		setCurrentIncome(income);
	};

	const addIncome = (newIncome) => {
		console.log(newIncome);
		const postURL = 'http://localhost:3001/api/v1/income/'; //Our previously set up route in the backend
		fetch(postURL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				// We should keep the fields consistent for managing this data later
				newIncome
			)
		})
			.then((response) => response.json())
			.then(() => {
				// Once posted, the user will be notified
				swal({
					title: 'Puiku!',
					text: 'Jūsų duomenys buvo pridėti',
					icon: 'success',
					button: 'Gerai!'
				}).then(function() {
					fetchData();
					closeModal();
				});
			});
	};

	return (
		<div className="income-container">
			<div className="income-row">
				<div className="col-12">
					<Header totalIncome={totalIncome} openModal={openModal} />
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
							<AddIncomeForm addIncome={addIncome} />
							{/* <button onClick={closeModal}>close</button> */}
						</Modal>
					</Fragment>
				)}
				<div className="IncomesListContainer">
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
