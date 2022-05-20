import React, { useState, Fragment, useEffect } from 'react';
import IncomesList from './IncomesList';
import EditIncomeForm from './EditIncomeForm';
// import Header from './IncomeHeader';
import './IncomeForm.css';
import AddIncomeForm from './AddIncomeForm';
import IncomeDoughnut from './IncomeDoughnut';

import swal from 'sweetalert';
import Swal from 'sweetalert2';

const IncomeForm = (props) => {
	const [ currentIncome, setCurrentIncome ] = useState({});
	const [ editing, setEditing ] = useState(false);
	const [ incomes, setIncomes ] = useState([]);

	const [ totalIncome, setTotalIncome ] = useState(0);

	useEffect(
		() => {
			let temp = 0;
			for (let i = 0; i < incomes.length; i++) {
				temp += parseInt(incomes[i].Amount);
			}
			setTotalIncome(temp);
		},
		[ incomes ]
	);

	const fetchData = async () => {
		await fetch('http://localhost:3001/api/v1/income').then((response) => response.json()).then((data) => {
			let tempData = [];
			data.data.incomes.map((income) => {
				if (income.UserId === props.currentUser._id) {
					tempData.push(income);
				}
			});
			setIncomes(tempData);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteIncome = async (id, income) => {
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
			console.log(props.currentUser._id);
			if (result.isConfirmed) {
				await fetch('http://localhost:3001/api/v1/income/' + id, {
					method: 'DELETE'
				})
					.then(() => {
						const postURLLog = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
						fetch(postURLLog, {
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								UserId: props.currentUser._id,
								ActionType: 'Ištrynė pajamą',
								Timestamp: Date.now(),
								Data: income
							})
						});
					})
					.then(() => {
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
			.then(() => {
				const postURLLog = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
				fetch(postURLLog, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						UserId: props.currentUser._id,
						ActionType: 'Atnaujino pajamą',
						Timestamp: Date.now(),
						Data: updatedIncome
					})
				});
			})
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
			.then(() => {
				const postURLLog = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
				fetch(postURLLog, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						UserId: props.currentUser._id,
						ActionType: 'Pridėjo pajamą',
						Timestamp: Date.now(),
						Data: newIncome
					})
				});
			})
			.then(() => {
				swal({
					title: 'Puiku!',
					text: 'Jūsų duomenys buvo pridėti',
					icon: 'success',
					button: 'Gerai!'
				});
			});
	};

	return (
		<div className="incomePage container-fluid">
			<div className="row">
				<div className="col-lg-5 col-md-12 col-sm-12">
					<div className="incomeDougnut">
						<IncomeDoughnut />
					</div>
				</div>

				<div className=" col-lg-7 col-md-12 col-sm-12">
					<div className="incomeEnter">
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
								<AddIncomeForm addIncome={addIncome} currentUser={props.currentUser} />
							</Fragment>
						)}
					</div>

					<div className=" IncomesListContainer ">
						<IncomesList
							className="IncomesList "
							incomes={incomes}
							editRow={editRow}
							deleteIncome={deleteIncome}
						/>
						<button className="IncomeListSeeMoreBtn">Žiūrėkite daugiau</button>
					</div>
				</div>
			</div>
			<IncomesList className="IncomesList " incomes={incomes} editRow={editRow} deleteIncome={deleteIncome} />
		</div>
	);
};
export default IncomeForm;
