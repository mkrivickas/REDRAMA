import React, { useState, useEffect } from 'react';
import HomeBalance from './HomeBalance';
import TransactionsTable from './TransactionsTable';

function TransactionList(props) {
	const { id } = props;
	let [ combinedList, setCombinedList ] = useState([]);
	let [ loading, setLoading ] = useState(true);
	let combinedArr;
	// let sortedCombinedList;

	// sortedCombinedList = combinedList.sort(
	// 	(a, b) => new Date(...a.combinedList.split('/').reverse()) - new Date(...b.combinedList.split('/').reverse())
	// );

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
			<div className="transactionsDivDiv">
				<HomeBalance combinedList={combinedList}/>
				{/* <div className='transactionsDivDivNav'>
					<button>Rušiuoti pagal data</button>
				</div> */}
				<TransactionsTable combinedList={combinedList} />
			</div>
		)
	);
}
export default TransactionList;
