import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './IncomeDoughnut.css';

function IncomeDoughnut(props) {
	let [ categoriesIncomes, setCategoriesIncomes ] = useState([]);
	let [ categoryNames, setCatNames ] = useState([]);

	useEffect(
		() => {
			let tempCatInc = [];
			let tempCatName = [];
			props.categories.map((category) => {
				if (category.categoryType === 'income') {
					tempCatName.push(category.categoryName);
					let singleCategoryIncome = 0;
					props.incomes.map((income) => {
						if (income.Category === category.categoryName) {
							singleCategoryIncome += income.Amount;
						}
					});
					tempCatInc.push(parseInt(singleCategoryIncome));
				}
			});
			setCategoriesIncomes(tempCatInc);
			setCatNames(tempCatName);
		},
		[ props.incomes, props.categories ]
	);

	const data = {
		labels: categoryNames,
		datasets: [
			{
				data: categoriesIncomes,
				backgroundColor: [
					'#ffd700',
					'#169873',
					'#da4167',
					'#dee5e5',
					'#048BA8',
					'#791E94',
					'#F0A202',
					'#60D394',
					'#D31a02',
					'#D3F3EE',
					'#6610F2',
					'#EFAAC4',
					'#E56399',
					'#FDE74C',
					'#08BDBD',
					'#FF6201',
					'#81E979',
					'#A7CDBD',
					'#7B8CDE',
					'#3C91E6',
					'#F7C548'
				],
				borderColor: [ 'rgb(0,0,0)' ],
				hoverBackgroundColor: [
					'#d7c350',
					'#A1E8AF',
					'#cd2851',
					'#9dc5bb',
					'#69A2B0',
					'#422040',
					'#C36F09',
					'#5FAD41',
					'#8C1C13',
					'#62929E',
					'#724CF9',
					'#E56399',
					'#995D81',
					'#D7C350',
					'#88A2AA',
					'#f63e02',
					'#B0FE76',
					'#869D7A',
					'#9999C3',
					'#3F7CAC',
					'#A98743'
				],
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
