import React, {useState, useEffect} from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function IncomeDoughnut(props) {
	let [isLoading, setIsLoading] = useState(true);
	let [categories, setCategories] = useState([]);
	let [categoriesNames, setCategoriesNames] = useState([]);
	let [categoryAmount, setCategoryAmount] = useState([]);
	
    function fetchCategories(){
        fetch('http://localhost:3001/api/v1/category/')
            .then(response => response.json())
            .then(data => {
            setCategories(data.data.categories);
            });
    }

	useEffect(() => {
	  fetchCategories();
	}, []);

	useEffect(() => {
		let tempCats = [];
		let tempAmount = [];
	
		categories.forEach((category)=>{
			if(category.categoryType === "income"){
				let tempCatSum = 0;
				tempCats.push(category.categoryName);
				props.incomes.forEach((income)=>{
					if(income.Category === category.categoryName){
						tempCatSum += income.Amount;
					}
				});
				tempAmount.push(tempCatSum);
			}
		});
		setCategoriesNames(tempCats);
		setCategoryAmount(tempAmount);
		setIsLoading(false);
	}, [categories, props.incomes]);
	
	

	const data = {
		labels: categoriesNames,
		datasets: [
			{
				data: categoryAmount,
				backgroundColor: [ '#ffd700', '#da4167' ],
				borderColor: [ 'rgb(0,0,0)' ],
				hoverBackgroundColor: [ '#d7c350', '#cd2851' ],
				hoverOffset: 20
			}
		]
	};
	return (
		<div className="Doughnut">
			{!isLoading &&
			<Doughnut
				data={data}
				width={400}
				height={400}
				options={{
					layout: {
						padding: 20
					},
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
			/>}
		</div>
	);
}

export default IncomeDoughnut;
