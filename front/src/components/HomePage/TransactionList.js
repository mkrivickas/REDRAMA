import React, { useState, useEffect } from 'react';


function TransactionList(props) {
	// Destructure your props...I'm assuming you pass some id into fetch data
	const { id } = props;
	let [ combinedList, setCombinedList ] = useState([]);
	let [ loading, setLoading ] = useState(true);
	let combinedArr;

	// State
	const [ tableData, setTableData ] = useState([]);

	// Load data when id changes
	useEffect(
		() => {
			fetchData();
		},
		[ id ]
	);

	async function fetchData() {
		fetchIncomes();
		/* // Get your data from each source
		const apiData_A = await fetchDataFromAPI_A(id);
		const apiData_B = await fetchDataFromAPI_B(id);
		// Key each data set by result ids
		const resultsMappedById_A = keyBy(apiData_A, 'id');
		const resultsMappedById_B = keyBy(apiData_B, 'id');
		// Combine data into a single set
		// this assumes your getting same results from each api
		const combinedDataSet = Object.keys(resultsMappedById_A).reduce((acc, key) => {
			// Destructure results together, merging objects
			acc.push({
				...resultsMappedById_A[key],
				...resultsMappedById_B[key]
			});
			return acc;
		}, []);
		setTableData(combinedDataSet); */
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

	

	return <div>{!loading && <div>{combinedList.map((item) => <>{ item.incomeName}</>)}</div>}</div>;
}

export default TransactionList;
