import React, { useState, useEffect } from 'react';
import MainDoughnutChart from './MainDoughnutChart';
import './HomeBalance.css';

const HomeBalance = (props) => {
	let [ mainBalance, setMainBalance ] = useState(0);

	useEffect(
		() => {
			let tempBalance = 0;
			setMainBalance(0);
			props.combinedList.map((listItem) => {
				if (listItem.Type === 'income') {
					tempBalance += parseInt(listItem.Amount);
				} else {
					tempBalance -= parseInt(listItem.Amount);
				}
				setMainBalance(tempBalance);
			});
		},
		[ props.combinedList ]
	);

	return (
		<div>
			<MainDoughnutChart combinedList={props.combinedList} mainBalance={mainBalance}/>
		</div>
	);
};

export default HomeBalance;
