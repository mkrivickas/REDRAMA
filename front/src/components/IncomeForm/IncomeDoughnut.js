import React, {useState, useEffect} from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './IncomeDoughnut.css';

function IncomeDoughnut(props) {
	const [totalExpenses, setTotalExpenses] = useState(0);
    let [categoriesIncomes, setCategoriesIncomes] = useState([]);
	let [categoryNames, setCatNames] = useState([]);





	useEffect(() => {
        let tempCatInc = [];
		let tempCatName = [];
        props.categories.map((category) => {
			if(category.categoryType === "income"){
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
    }, [props.incomes, props.categories]);

	
	const data = {
		labels: categoryNames,
		datasets: [
			{
				data: categoriesIncomes,
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
