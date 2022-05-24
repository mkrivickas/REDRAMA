import React, { useState, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import './ExpenseForm.css';
import ExpenseDoughnutChart from './ExpenseDoughnutChart';
import Swal from 'sweetalert2';

const validExpenseAmount = new RegExp('^[0-9.]{1,10}?$');

const ExpenseForm = (props) => {
    let [categories, setCategories] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    let [isloadingExp, setIsLoadingExp] = useState(true);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toLocaleString('lt-LT', {
        timeZone: 'Etc/GMT-6',
    });
    const [currentExpense, setCurrentExpense] = useState({});
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [expense, setExpense] = useState('');
    let maxDate = new Date();
    let isIncomeValid = true;
    const [enteredDate, setEnteredDate] = useState(
        maxDate.toLocaleDateString('lt-LT')
    );
    const [enteredCategory, setEnteredCategory] = useState('food');

    const [editing, setEditing] = useState(false);

    function fetchCategories() {
        fetch('http://localhost:3001/api/v1/category/')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.data.categories);
                setIsLoading(false);
            });
    }

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };
    const amountChangeHandler = (event) => {
        isIncomeValid = true;
        event.target.setCustomValidity('');
        if (!validExpenseAmount.test(event.target.value)) {
            isIncomeValid = false;
            event.target.setCustomValidity(
                'Suma negali būti ilgesnė nei 10 simbolių ir po kablelio gali būti tik 2 simboliai'
            );
        }
        setEnteredAmount(event.target.value);
    };
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };
    const categoryChangeHandler = (event) => {
        setEnteredCategory(event.target.value);
    };

    const fetchData = async () => {
        await fetch('http://localhost:3001/api/v1/expense')
            .then((response) => response.json())
            .then((data) => {
                let tempData = [];
                data.data.expense.map((expense) => {
                    if (expense.UserId === props.currentUser._id) {
                        tempData.push(expense);
                    }
                });
                setExpense(tempData);
                setIsLoadingExp(false);
            });
    };

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (editing) {
            setEnteredCategory(currentExpense.Category);
            setEnteredTitle(currentExpense.Name);
            setEnteredAmount(currentExpense.Amount);
            setEnteredDate(currentExpense.Date);
        }
    }, [editing, currentExpense]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (editing) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Name: enteredTitle,
                    Amount: enteredAmount,
                    Date: enteredDate,
                    Category: enteredCategory,
                    Type: 'expense',
                    UserId: props.currentUser._id,
                }),
            };
            fetch(
                'http://localhost:3001/api/v1/expense/' + currentExpense._id,
                requestOptions
            )
                .then((response) => response.json())
                .then(() => {
                    const postURLLog =
                        'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
                    fetch(postURLLog, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            UserId: props.currentUser._id,
                            ActionType: 'Atnaujino išlaidą',
                            Timestamp: today,
                            Data: {
                                Name: enteredTitle,
                                Amount: enteredAmount,
                                Date: enteredDate,
                                Category: enteredCategory,
                                Type: 'expense',
                                UserId: props.currentUser._id,
                            },
                        }),
                    });
                })
                .then((data) => {
                    fetchData();
                    setEnteredTitle('');
                    setEnteredAmount('');
                    setEnteredDate(maxDate.toLocaleDateString('lt-LT'));
                    setEnteredCategory('');
                    setEditing(false);
                    setCurrentExpense('');
                    Swal.fire({
                        title: 'Duomenys sėkmingai atnaujinti.',
                        confirmButtonText: 'Gerai',
                    });
                });
        } else {
            const postURL = 'http://localhost:3001/api/v1/expense/';

            Swal.fire({
                title: 'Ar esate tikri?',
                text: 'Dėmesio! Duomenys bus įrašyti.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#268b29',
                cancelButtonColor: '#ffd700',
                confirmButtonText: 'Įrašyti',
                cancelButtonText: 'Atšaukti',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(postURL, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Name: enteredTitle,
                            Amount: enteredAmount,
                            Date: enteredDate,
                            Category: enteredCategory,
                            Type: 'expense',
                            UserId: props.currentUser._id,
                        }),
                    })
                        .then(() => {
                            const postURLLog =
                                'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
                            fetch(postURLLog, {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    UserId: props.currentUser._id,
                                    ActionType: 'Pridėjo išlaidą',
                                    Timestamp: today,
                                    Data: {
                                        Name: enteredTitle,
                                        Amount: enteredAmount,
                                        Date: enteredDate,
                                        Category: enteredCategory,
                                        Type: 'expense',
                                        UserId: props.currentUser._id,
                                    },
                                }),
                            });
                        })
                        .then(() => {
                            Swal.fire({
                                title: 'Įrašyta!',
                                text: 'Įrašas įtrauktas į žurnalą.',
                                icon: 'success',
                                confirmButtonText: 'Gerai!',
                            });
                            fetchData();
                            setEnteredTitle('');
                            setEnteredAmount('');
                            setEnteredDate(maxDate.toLocaleDateString('lt-LT'));
                            setEnteredCategory('');
                        });
                }
            });
        }
    };
    const deleteExpense = async (id, deletedExpense) => {
        Swal.fire({
            title: 'Ar esate tikri?',
            text: 'Dėmesio duomenys bus pašalinti!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Atšaukti',
            confirmButtonColor: '#268b29',
            cancelButtonColor: '#ffd700',
            confirmButtonText: 'Taip, pašalinti!',
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await fetch('http://localhost:3001/api/v1/expense/' + id, {
                        method: 'DELETE',
                    }).then(() => {
                        setExpense(
                            expense.filter((expense) => expense.id !== id)
                        );
                        fetchData();
                        Swal.fire({
                            title: 'Jūsų duomenys buvo pašalinti!',
                            icon: 'success',
                            confirmButtonText: 'Gerai',
                        });
                    });
                }
            })
            .then(() => {
                const postURLLog =
                    'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
                fetch(postURLLog, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        UserId: props.currentUser._id,
                        ActionType: 'Ištrynė išlaidą',
                        Timestamp: today,
                        Data: deletedExpense,
                    }),
                });
            });

        setExpense(expense.filter((expense) => expense.id !== id));
        fetchData();
    };
    const editRow = (expense) => {
        setEditing(true);
        setCurrentExpense(expense);
    };

    const cancelUpdate = () => {
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate(maxDate.toLocaleDateString('lt-LT'));
        setEnteredCategory('');
        setEditing(false);
        setCurrentExpense('');
    };

    return (
        <div className='expenseCategorySelector row'>
            {!isLoading && !isloadingExp && (
                <div className='col-lg-5'>
                    <div>
                        <ExpenseDoughnutChart
                            categories={categories}
                            expense={expense}
                        />
                    </div>
                </div>
            )}

            <form className='col-lg-7' onSubmit={submitHandler}>
                <div className='new-expense__controls row d-flex'>
                    <h3 className='AddExpenseForm-title col-lg-12'>
                        Pridėti išlaidas
                    </h3>
                    <div className='new-expense__control col-6'>
                        <select
                            required
                            onChange={categoryChangeHandler}
                            value={enteredCategory}
                        >
                            <option hidden value=''>
                                -----------
                            </option>
                            {!isLoading &&
                                categories.map(
                                    (category) =>
                                        category.categoryType === 'expense' && (
                                            <option
                                                key={category._id}
                                                value={category.categoryName}
                                            >
                                                {category.categoryName}
                                            </option>
                                        )
                                )}
                        </select>
                    </div>
                    <div className='new-expense__control col-6'>
                        <input
                            id='sum'
                            type='number'
                            name='expenseAmount'
                            required
                            max='9999999999'
                            min='0.01'
                            step='0.01'
                            placeholder='Išlaidų suma, €'
                            value={enteredAmount}
                            onChange={amountChangeHandler}
                        />
                    </div>
                    <div className='new-expense__control col-6'>
                        <input
                            type='date'
                            required
                            name='expenseDate'
                            min='2019-01-01'
                            max={maxDate.toLocaleDateString('lt-LT')}
                            placeholder='MMMM-mm-dd'
                            value={enteredDate}
                            onChange={dateChangeHandler}
                        />
                    </div>
                    <div className='new-expense__control col-6'>
                        <input
                            id='expenseTitle'
                            type='text'
                            name='expenseName'
                            required
                            maxLength='20'
                            minLength='3'
                            placeholder='Išlaidų pavadinimas'
                            pattern='^[\p{L},.0-9\s-]+$'
                            value={enteredTitle}
                            onChange={titleChangeHandler}
                        />
                    </div>
                </div>
                <div className='new-expense__actions'>
                    <button className='expense-submit-button'>
                        {editing ? <>Atnaujinti</> : <>Pridėti</>}
                    </button>
                    {editing && (
                        <button
                            type='cancel'
                            variant='contained'
                            className='my-customized-button'
                            onClick={() => {
                                cancelUpdate();
                            }}
                        >
                            Atšaukti
                        </button>
                    )}
                </div>
                <ExpenseList
                    expense={expense}
                    editExpense={editRow}
                    deleteExpense={deleteExpense}
                />
            </form>
        </div>
    );
};

export default ExpenseForm;
