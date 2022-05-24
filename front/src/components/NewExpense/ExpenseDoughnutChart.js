import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './ExpenseDoughnutChart.css';

export default function ExpenseDoughnutChart(props) {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [categoryNames, setCategoryNames] = useState([]);
    let [categoriesExpenses, setCategoriesExpenses] = useState([]);

    const data = {
        labels: categoryNames,
        datasets: [
            {
                data: categoriesExpenses,
                backgroundColor: [
                    '#ffd700',
                    '#da4167',
                    '#169873',
                    '#dee5e5',
                    '#5FAD41',
                    '#048BA8',
                    '#791E94',
                    '#F0A202',
                    '#D3F3EE',
                    '#EFAAC4',
                    '#6610F2',
                    '#E56399',
                    '#FDE74C',
                    '#08BDBD',
                    '#FF6201',
                    '#A7CDBD',
                    '#7B8CDE',
                    '#3C91E6',
                    '#81E979',
                    '#F7C548',
                ],
                borderColor: ['rgb(0,0,0)'],
                hoverBackgroundColor: [
                    '#d7c350',
                    '#cd2851',
                    '#A1E8AF',
                    '#9dc5bb',
                    '#60D394',
                    '#69A2B0',
                    '#422040',
                    '#C36F09',
                    '#62929E',
                    '#E56399',
                    '#724CF9',
                    '#995D81',
                    '#D7C350',
                    '#88A2AA',
                    '#f63e02',
                    '#869D7A',
                    '#9999C3',
                    '#3F7CAC',
                    '#B0FE76',
                    '#A98743',
                ],
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
