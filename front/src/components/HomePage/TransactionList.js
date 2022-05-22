import React, { useState, useEffect } from 'react';
import HomeBalance from './HomeBalance';
import TransactionsTable from './TransactionsTable';
import './TransactionsTable.css';
import './TransactionList.css';

function TransactionList(props) {
	// const { id } = props;
	let [ combinedList, setCombinedList ] = useState([]);
	let [ loading, setLoading ] = useState(true);
	let combinedArr;
	let [ monthFilter, setMonthFilter ] = useState(0);
	let [ copyCombinedList, setCopyCombinedList ] = useState([]);
	let [isShowMore, setIsShowMore] = useState(false);

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
					setCopyCombinedList(combinedArr);
					setLoading(false);
				});
			});
	}
	useEffect(
		() => {
			if (parseInt(monthFilter) !== 0) {
				let tempData = [];
				setCombinedList([]);

				copyCombinedList.map((item) => {
					let splitDate = item.Date.split('-');
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
			<div className="transactionsDivDiv container-fluid">
				<div className=" row">
					<div className="doughnut-homePage col-lg-6 col-md-12 col-sm-12">
						<HomeBalance combinedList={combinedList} />
					</div>
					<div className="TableTransactionList col-lg-6 col-md-12 col-sm-12">
						
						<h5 className='monthFilter-box'>Filtruokite pagal mėnesį:
						<select
							className="monthFilterButton"
							value={monthFilter}
							onChange={(e) => {
								setMonthFilter(e.target.value);
							}}
						>	<option value="" hidden>---------</option>
							<option value="1">Sausis</option>
							<option value="2">Vasaris</option>
							<option value="3">Kovas</option>
							<option value="4">Balandis</option>
							<option value="5">Gegužė</option>
							<option value="6">Birželis</option>
							<option value="7">Liepa</option>
							<option value="8">Rugpjūtis</option>
							<option value="9">Rugsėjis</option>
							<option value="10">Spalis</option>
							<option value="11">Lapkritis</option>
							<option value="12">Gruodis</option>
						</select>
						{monthFilter !== 0 && (
							<>
							<button class="MonthFilterCancelButton"
								onClick={() => {
									setMonthFilter(0);
								}}
							>
								Atšaukti
							</button></>
						)}
                    </h5>
						<div>
							{!isShowMore &&<TransactionsTable combinedList={combinedList} isShowMore={isShowMore} setIsShowMore={setIsShowMore}/>}
						</div>
					</div>
				{isShowMore &&<TransactionsTable combinedList={combinedList} isShowMore={isShowMore}  setIsShowMore={setIsShowMore}/>}
			</div></div>
			
		)
	);
}
export default TransactionList;
