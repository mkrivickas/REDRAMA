import React, { useState, useEffect } from 'react';
import TransactionsTable from './TransactionsTable';

function TransactionList(props) {
	const { id } = props;
	let [ combinedList, setCombinedList ] = useState([]);
	let [ loading, setLoading ] = useState(true);
	let combinedArr;
	// let sortedCombinedList;

	// sortedCombinedList = combinedList.sort(
	// 	(a, b) =>
	// 		new Date(...a.item.expenseDate.split('/').reverse()) - new Date(...b.item.expenseDate.split('/').reverse())
	// );
	// console.log(sortedCombinedList);

	useEffect(
		() => {
			fetchData();
		},
		[ id ]
	);

	async function fetchData() {
		fetchIncomes();
	}
	function fetchIncomes() {
		fetch('http://localhost:3001/api/v1/income')
			.then((response) => response.json())
			.then((data) => {
				combinedArr = [ ...data.data.incomes ];
			})
			.then(() => {
				fetch('http://localhost:3001/api/v1/expense').then((response) => response.json()).then((data) => {
					combinedArr = [ ...combinedArr, ...data.data.expense ];
					console.log(combinedArr);
					setCombinedList(combinedArr);
					setLoading(false);
				});
			});
	}

	return (
		!loading && (
			<div>
				<TransactionsTable combinedList={combinedList} />
			</div>
		)
	);
}
export default TransactionList;
