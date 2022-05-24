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
                        display: true,
                    },
                    plugins: {
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
        </div>
    );
}
