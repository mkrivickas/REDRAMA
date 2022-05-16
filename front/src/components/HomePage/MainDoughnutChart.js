import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function MainDoughnutChart() {
	const data = {
		labels: [ 'Pajamos', 'Išlaidos' ],
		datasets: [
			{
				data: [ 68, 30 ],
				backgroundColor: [ '#ffd700', '#da4167' ],
				borderColor: [ 'rgb(0,0,0)' ],
				hoverBackgroundColor: [ '#d7c350', '#cd2851' ],
				hoverOffset: 20
			}
		]
	};

	// const [ totalIncome, setTotalIncome ] = useState(0);

	// useEffect(
	// 	() => {
	// 		let tempIncome = 0;
	// 		props.combinedList.map((listItem) => {
	// 			if (listItem.Type === 'income') {
	// 				for (let i = 0; i < listItem.length; i++) {
	// 					tempIncome += parseInt(listItem[i].Amount);
	// 				}
	// 				setTotalIncome(tempIncome);
	// 				};
	// 			},

	// 			[ props.combinedList ]
	// 		},
	// 		);

	return (
		<div>
			<h2>React Doughnut with doughnutlabel</h2>
			<Doughnut
				data={data}
				options={{
					cutoutPercentage: 75,
					legend: {
						display: false
					},
					plugins: {
						animation: {
							animateScale: true
						},

						ChartDataLabels,
						datalabels: {
							//display: false,
							color: '#ffd700',
							font: {
								size: 18,
								weight: 'bold'
							}
						}
					}
				}}
			/>
		</div>
	);
}
