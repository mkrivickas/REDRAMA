import React, { useState, useEffect } from 'react';
import MainDoughnutChart from './MainDoughnutChart';
import './HomeBalance.css';

const HomeBalance = (props) => {
	let [ mainBalance, setMainBalance ] = useState(0);

	useEffect(
		() => {
			let tempBalance = 0;
			props.combinedList.map((listItem) => {
				if (listItem.Type === 'income') {
					console.log('+' + listItem.Amount);
					tempBalance += parseInt(listItem.Amount);
				} else {
					console.log('-' + listItem.Amount);
					tempBalance -= parseInt(listItem.Amount);
				}
				setMainBalance(tempBalance);
			});
		},
		[ props.combinedList ]
	);

	return (
		<div>
			<MainDoughnutChart combinedList={props.combinedList} />

			<div className="homeBalancePage">
				<div className="balance-text">
					<h2>Balansas </h2>
					<h2>{mainBalance}€</h2>
				</div>
			</div>
		</div>
	);
};

export default HomeBalance;
