import React, { useState, useEffect } from 'react';
import HomeBalance from './HomeBalance';
import TransactionsTable from './TransactionsTable';

function TransactionList(props) {
	const { id } = props;
	let [ combinedList, setCombinedList ] = useState([]);
	let [ loading, setLoading ] = useState(true);
	let combinedArr;
	let [ monthFilter, setMonthFilter ] = useState(0);
	let [ copyCombinedList, setCopyCombinedList ] = useState([]);

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
				console.log(data.data.incomes);
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
					console.log(data.data.expense);
					console.log('userId:' + props.currentUser._id);
					data.data.expense.map((expense) => {
						if (expense.UserId == props.currentUser._id) {
							tempData.push(expense);
						}
					});
					combinedArr = [ ...combinedArr, ...tempData ];
					console.log(combinedArr);
					setCombinedList(combinedArr);
					setCopyCombinedList(combinedArr);
					setLoading(false);
				});
			});
	}
	useEffect(
		() => {
			if (parseInt(monthFilter) !== 0) {
				let tempData = [];

				console.log(monthFilter);
				copyCombinedList.map((item) => {
					let splitDate = item.Date.split('-');
					console.log(parseInt(splitDate[1]));
					if (parseInt(monthFilter) === parseInt(splitDate[1])) {
						tempData.push(item);
					}
				});
				setCombinedList(tempData);
			} else {
				setCombinedList(copyCombinedList);
			}
		},
		[ monthFilter ]
	);

	return (
		!loading && (
			<div className="transactionsDivDiv">
				<HomeBalance combinedList={combinedList} />
				<select
					value={monthFilter}
					onChange={(e) => {
						setMonthFilter(e.target.value);
					}}
				>
					<option value="1">sausis</option>
					<option value="2">vasaris</option>
					<option value="3">kovas</option>
					<option value="4">balandis</option>
					<option value="5">geguze</option>
				</select>
				{monthFilter !== 0 && (
					<button
						onClick={() => {
							setMonthFilter(0);
						}}
					>
						Atšaukti
					</button>
				)}
				<TransactionsTable combinedList={combinedList} />
			</div>
		)
	);
}
export default TransactionList;
