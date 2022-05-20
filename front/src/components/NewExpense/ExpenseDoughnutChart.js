import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './ExpenseDoughnutChart.css';

export default function ExpenseDoughnutChart(props) {
    const [totalExpenses, setTotalExpenses] = useState(0);
    let [categoriesExpenses, setCategoriesExpenses] = useState([]);

    const data = {
        labels: [props.categories[0].categoryName],
        datasets: [
            {
                data: categoriesExpenses,
                backgroundColor: [
                    '#ffd700',
                    '#da4167',
                    '#169873',
                    '#dee5e5',
                    '#1a1d23',
                    '#4E3822',
                    '#57737A',
                    '#2B3A67',
                    '#493843',
                    '#5FAD41',
                    '#048BA8',
                    '#791E94',
                    '#F0A202',
                    '#D3F3EE',
                    '#EFAAC4',
                    '#E56399',
                    '#626267',
                    '#FDE74C',
                    '#08BDBD',
                    '#FF6201',
                ],
                borderColor: ['rgb(0,0,0)'],
                hoverBackgroundColor: [
                    '#d7c350',
                    '#cd2851',
                    '#212922',
                    '#9dc5bb',
                    '#020202',
                    '#362C28',
                    '#2B2D42',
                    '#2B2D42',
                    '#270722',
                    '#36453B',
                    '#033F63',
                    '#320A28',
                    '#6B2B06',
                    '#537D8D',
                    '#995D81',
                    '#8E3B46',
                    '#605B56',
                    '#D7C350',
                    '#3A606E',
                    '#f63e02',
                ],
                hoverOffset: 20,
            },
        ],
    };

    // TODO: `kategorijoms` useEffect(() => {
    //   first

    //   return () => {
    // 	second
    //   }
    // }, [third])

    useEffect(() => {
        let tempCatExp = [];
        props.categories.map((category) => {
            let singleCategoryExpense = 0;
            props.expense.map((expense) => {
                if (expense.Category == category.categoryName) {
                    singleCategoryExpense += expense.Amount;
                }
            });
            tempCatExp.push(singleCategoryExpense);
        });
        setCategoriesExpenses(tempCatExp);
    }, [props.expense]);

    // useEffect(
    // 	() => {
    // 		let tempIncome = 0;
    // 		let tempExpense = 0;
    // 		props.combinedList.map((listItem) => {
    // 			if (listItem.Type === 'income') {
    // 				tempIncome += parseInt(listItem.Amount);

    // 				setTotalIncome(tempIncome);
    // 				console.log(tempIncome);
    // 			} else {
    // 				tempExpense += parseInt(listItem.Amount);

    // 				setTotalExpense(tempExpense);
    // 				console.log(tempExpense);
    // 			}
    // 		});
    // 	},
    // 	[ props.combinedList ]
    // );nuotrau

    return (
        <div className='Doughnut'>
            <Doughnut
                data={data}
                width={400}
                height={400}
                options={{
                    layout: {
                        padding: 20,
                    },
                    cutoutPercentage: 75,
                    legend: {
                        display: false,
                    },
                    plugins: {
                        animation: {
                            animateScale: true,
                        },

                        ChartDataLabels,
                        datalabels: {
                            //display: false,
                            color: '#ffd700',
                            font: {
                                size: 18,
                                weight: 'bold',
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
