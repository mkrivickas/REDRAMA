import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './IncomeDoughnut.css';

function IncomeDoughnut() {
	const data = {
		labels: [ 'Pajamos', 'Išlaidos' ],
		datasets: [
			{
				data: [ 70, 50 ],
				backgroundColor: [ '#ffd700', '#da4167' ],
				borderColor: [ 'rgb(0,0,0)' ],
				// hoverBackgroundColor: [ '#d7c350', '#cd2851' ],
				hoverOffset: 20
			}
		]
	};
	return (
		<div className="Doughnut-income  ">
			<Doughnut
				data={data}
				width={600}
				height={600}
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

export default IncomeDoughnut;
