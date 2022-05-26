import React, { useState, Fragment, useEffect } from 'react';
import IncomesList from './IncomesList';
import EditIncomeForm from './EditIncomeForm';
// import Header from './IncomeHeader';
import './IncomeForm.css';
import AddIncomeForm from './AddIncomeForm';
import IncomeDoughnut from './IncomeDoughnut';

import swal from 'sweetalert';
import Swal from 'sweetalert2';
import SpinningLoad from '../Extra/SpinningLoad';

const IncomeForm = (props) => {
	const [ currentIncome, setCurrentIncome ] = useState({});
	const [ editing, setEditing ] = useState(false);
	const [ incomes, setIncomes ] = useState([]);
	const timeElapsed = Date.now();
	const today = new Date(timeElapsed).toLocaleString('lt-LT', { timeZone: 'Etc/GMT-6' });
	let [ isShowMore, setIsShowMore ] = useState(false);

	const [ totalIncome, setTotalIncome ] = useState(0);
	let [ categories, setCategories ] = useState([]);
	let [ loading, setIsLoading ] = useState(true);

	function fetchCategories() {
		fetch('http://localhost:3001/api/v1/category/').then((response) => response.json()).then((data) => {
			setCategories(data.data.categories);
			setIsLoading(false);
		});
	}

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
			data.data.incomes.forEach((income) => {
				if (income.UserId === props.currentUser._id) {
					tempData.push(income);
				}
			});
			setIncomes(tempData);
		});
	};

	useEffect(() => {
		fetchData();
		fetchCategories();
	}, []);

	const deleteIncome = async (id, income) => {
		console.log(id);
		Swal.fire({
			title: 'Ar esate tikri?',
			text: 'Dėmesio duomenys bus pašalinti!',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'Atšaukti',
			confirmButtonColor: '#268b29',
			cancelButtonColor: '#ffd700',
			confirmButtonText: 'Taip, pašalinti!'
		}).then(async (result) => {
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
								Timestamp: today,
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
							confirmButtonText: 'Gerai',
							confirmButtonColor: '#268b29'
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
						Timestamp: today,
						Data: updatedIncome
					})
				});
			})
			.then(() => {
				swal({
					title: 'Puiku!',
					text: 'Jūsų duomenys buvo atnaujinti',
					icon: 'success',
					button: 'Gerai!',
					confirmButtonText: 'Gerai',
					confirmButtonColor: '#268b29'
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
						Timestamp: today,
						Data: newIncome
					})
				});
			})
			.then(() => {
				fetchData();
				swal({
					title: 'Puiku!',
					text: 'Jūsų duomenys buvo pridėti',
					icon: 'success',
					button: 'Gerai!',
					confirmButtonText: 'Gerai',
					confirmButtonColor: '#268b29'
				});
			});
	};

	return (
		<div className=" container-fluid incomesContainer">
			{!loading ? (
			<div className="row incomePage">
				<div className="col-lg-5 col-md-12 col-sm-12">
					<div className="incomeDougnut">
						<IncomeDoughnut incomes={incomes} categories={categories} totalIncome={totalIncome} />
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

					{!isShowMore && (
						<div className="IncomesListContainer ">
							<IncomesList
								className="IncomesList "
								incomes={incomes}
								editRow={editRow}
								deleteIncome={deleteIncome}
								isShowMore={isShowMore}
								setIsShowMore={setIsShowMore}
							/>
						</div>
					)}
				</div>
			</div>): <SpinningLoad />}

			{isShowMore && (
				<div className="IncomesListContainer container-fluid">
					<IncomesList
						incomes={incomes}
						editRow={editRow}
						deleteIncome={deleteIncome}
						isShowMore={isShowMore}
						setIsShowMore={setIsShowMore}
					/>
				</div>
			)}
		</div>
	);
};
export default IncomeForm;
