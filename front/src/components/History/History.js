import React, { useState, useEffect } from 'react';
import SpinningLoad from '../Extra/SpinningLoad';

import './History.css';

function History(props) {
	let [ combinedList, setCombinedList ] = useState([]);
	let [ loading, setLoading ] = useState(true);
	let combinedArr;

	useEffect(() => {
		fetchData();
	}, []);
	async function fetchData() {
		fetchIncomes();
	}
	useEffect(
		() => {
			const sortedListByDate = combinedList.sort(function(a, b) {
				var c = new Date(a.Date);
				var d = new Date(b.Date);
				return c - d;
			});
			setCombinedList(sortedListByDate.reverse());
		},
		[ combinedList ]
	);

	function fetchIncomes() {
		fetch('http://localhost:3001/api/v1/income')
			.then((response) => response.json())
			.then((data) => {
				let tempDataIncome = [];
				data.data.incomes.map((income) => {
					if (income.UserId === props.currentUser._id) {
						tempDataIncome.push(income);
					}
				});
				combinedArr = [ ...tempDataIncome ];
			})
			.then(() => {
				fetch('http://localhost:3001/api/v1/expense').then((response) => response.json()).then((data) => {
					let tempData = [];
					data.data.expense.map((expense) => {
						if (expense.UserId == props.currentUser._id) {
							tempData.push(expense);
						}
					});
					combinedArr = [ ...combinedArr, ...tempData ];
					setCombinedList(combinedArr);

					setLoading(false);
				});
			});
	}

	return (
		!loading ? (
			<div className="historyTransactionsPage">
				<div className="historyTransactionPage-title">
					<div className="historyTransactionsSingleDate-title">Data</div>
					<div className="historyTransactionsSingleCategory-title">Kategorija</div>
					<div className="historyTransactionsSingleName-title">Pavadinimas</div>
					<div className="historyTransactionsSingleAmount-title">Suma</div>
				</div>
				<div className="historyTransactionsSingle-list">
					{combinedList.length > 0 ? (
						combinedList.map((item) => (
							<div key={item._id}
								className={
									item.Type === 'expense' ? (
										'historyTransactionsSingleItem historyTransactionsSingleRed'
									) : (
										'historyTransactionsSingleItem historyTransactionsSingleGreen'
									)
								}
							>
								<div className="historyTransactionsSingleDate">{item.Date.slice(0, 10)}</div>
								<div className="historyTransactionsSingleCategory">{item.Category}</div>
								<div className="historyTransactionsSingleName">{item.Name}</div>
								<div
									className={
										item.Type === 'expense' ? (
											'historyTransactionsSingleAmount'
										) : (
											'historyTransactionsSingleAmount historyTransactionsSingleAmountGreen'
										)
									}
								>
									{item.Type === 'expense' ? '- ' : '+ '}
									{item.Amount}€
								</div>
							</div>
						))
					) : (
						<tr>
							<td colSpan={3}>Nėra pajamų</td>
						</tr>
					)}
				</div>
			</div>
		):<SpinningLoad opacity={1}/>
	);
}
export default History;
