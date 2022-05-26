import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './ExpenseDoughnutChart.css';

export default function ExpenseDoughnutChart(props) {
    const [categoryNames, setCategoryNames] = useState([]);
    let [categoriesExpenses, setCategoriesExpenses] = useState([]);
    let [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        let tempTotalExpense = 0
      props.expense.forEach((expense)=>{
        tempTotalExpense += expense.Amount;
      })
      setTotalExpense(tempTotalExpense)

    }, [props.expense])
    
    const data = {
        labels: categoryNames,
        datasets: [
            {
                data: categoriesExpenses,
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
                    '#F7C548',
                ],
                borderColor: ['rgb(0,0,0)'],
                hoverOffset: 20,
            },
        ],
    };

    useEffect(() => {
        let tempCatExp = [];
        let tempCatName = [];
        props.categories.map((category) => {
            if (category.categoryType === 'expense') {
                tempCatName.push(category.categoryName);
            }
            let singleCategoryExpense = 0;
            props.expense.map((expense) => {
                if (expense.Category == category.categoryName) {
                    singleCategoryExpense += expense.Amount;
                }
            });
            tempCatExp.push(singleCategoryExpense);
        });
        setCategoriesExpenses(tempCatExp);
        setCategoryNames(tempCatName);
    }, [props.expense]);

    return (
        <div className='Doughnut'>
            <Doughnut
                data={data}
                width={600}
                height={600}
                options={{
                    layout: {
                        padding: 20,
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    cutoutPercentage: 75,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        animation: {
                            animateScale: true,
                        },

                        ChartDataLabels,
                        datalabels: {
                            display: true,
                            color: '#ffd700',
                            font: {
                                size: 18,
                                weight: 'bold',
                            },
                        },
                    },
                }}
            />
            <div className='totalExpense'>
                <h2 className='totalExpense-number'>
                                {totalExpense}€
                </h2>
            </div>
        </div>
    );
}
