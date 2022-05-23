import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './MainDoughnutChart.css';

export default function MainDoughnutChart(props) {
	const [ totalIncome, setTotalIncome ] = useState(0);
	const [ totalExpense, setTotalExpense ] = useState(0);
	const data = {
		labels: [ 'Pajamos', 'Išlaidos' ],
		datasets: [
			{
				data: [ totalIncome, totalExpense ],
				backgroundColor: [ '#ffd700', '#da4167' ],
				borderColor: [ 'rgb(0,0,0)' ],
				// hoverBackgroundColor: [ '#d7c350', '#cd2851' ],
				hoverOffset: 20
			}
		]
	};

	useEffect(
		() => {
			setTotalExpense(0);
			setTotalIncome(0);
			let tempIncome = 0;
			let tempExpense = 0;
			props.combinedList.map((listItem) => {
				if (listItem.Type === 'income') {
					tempIncome += parseInt(listItem.Amount);

					setTotalIncome(tempIncome);
				} else {
					tempExpense += parseInt(listItem.Amount);

					setTotalExpense(tempExpense);
				}
			});
		},
		[ props.combinedList ]
	);

	return (
		<div className="Doughnut-homePage">
			<Doughnut
				data={data}
				width={650}
				height={650}
				options={{
					layout: {
						padding: 20
					},

					responsive: true,
					maintainAspectRatio: false,
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
