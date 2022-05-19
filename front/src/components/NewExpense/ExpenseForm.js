import React, { useState, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import './ExpenseForm.css';
import Swal from 'sweetalert2';

const validExpenseAmount = new RegExp('^[0-9.]{1,10}?$');

const ExpenseForm = (props) => {

    let [categories, setCategories] = useState("")
    let [isLoading, setIsLoading] = useState(true)


    function fetchCategories(){
        fetch('http://localhost:3001/api/v1/category/')
            .then(response => response.json())
            .then(data => {
            setCategories(data.data.categories);
            setIsLoading(false);
            console.log(categories)
            
            });
    }
    

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
	// const [userInput, setUserInput] = useState({
	//     enteredTitle: '',
	//     enteredAmount: '',
	//     enteredDate: '',
	// });

	const titleChangeHandler = (event) => {
		setEnteredTitle(event.target.value);
		// setUserInput({
		//     ...userInput,
		//     enteredTitle: event.target.value,
		// });
		// setUserInput((prevState) => {
		//     return { ...prevState, enteredTitle: event.target.value };
		// });
	};
	const amountChangeHandler = (event) => {
		isIncomeValid = true;
		event.target.setCustomValidity('');
		console.log(validExpenseAmount.test(event.target.value));
		if (!validExpenseAmount.test(event.target.value)) {
			isIncomeValid = false;
			event.target.setCustomValidity(
				'Suma negali būti ilgesnė nei 10 simbolių ir po kablelio gali būti tik 2 simboliai'
			);
		}
		setEnteredAmount(event.target.value);
		// setUserInput({
		//     ...userInput,
		//     enteredAmount: event.target.value,
		// });
	};
	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
		// setUserInput({
		//     ...userInput,
		//     enteredDate: event.target.value,
		// });
	};
	const categoryChangeHandler = (event) => {
		setEnteredCategory(event.target.value);
	};

	const fetchData = async () => {
		await fetch('http://localhost:3001/api/v1/expense').then((response) => response.json()).then((data) => {
            let tempData = [];
			data.data.expense.map((expense)=>{
				if(expense.UserId === props.currentUser._id){
					tempData.push(expense);
				}
			})
			setExpense(tempData);
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
                    Type: "expense",
                    UserId: props.currentUser._id
                }),
            };
            fetch(
                'http://localhost:3001/api/v1/expense/' + currentExpense._id,
                requestOptions
            )
                .then((response) => response.json())
                .then(()=>{
					const postURLLog = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
					fetch(postURLLog, {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(
							{
								UserId: props.currentUser._id,
								ActionType: "Atnaujino išlaidą",
								Timestamp: Date.now(),
								Data: {
                                    Name: enteredTitle,
                                    Amount: enteredAmount,
                                    Date: enteredDate,
                                    Category: enteredCategory,
                                    Type: "expense",
                                    UserId: props.currentUser._id
                                }
							})
	
							}
						);
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
            // Once the form has been submitted, this function will post to the backend
            const postURL = 'http://localhost:3001/api/v1/expense/'; //Our previously set up route in the backend

            // Once posted, the user will be notified
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
                            // We should keep the fields consistent for managing this data later
                            Name: enteredTitle,
                            Amount: enteredAmount,
                            Date: enteredDate,
                            Category: enteredCategory,
                            Type: "expense",
                            UserId: props.currentUser._id
                        }),
                    }).then(()=>{
                        const postURLLog = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
                        fetch(postURLLog, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(
                                {
                                    UserId: props.currentUser._id,
                                    ActionType: "Pridėjo išlaidą",
                                    Timestamp: Date.now(),
                                    Data: {
                                        Name: enteredTitle,
                                        Amount: enteredAmount,
                                        Date: enteredDate,
                                        Category: enteredCategory,
                                        Type: "expense",
                                        UserId: props.currentUser._id
                                    }
                                })
        
                                }
                            );
                        }).then(() => {
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

        // alert('Your incomes was added successfully');
    };
	const deleteExpense = async (id, deletedExpense) => {
        console.log(id);
        Swal.fire({
            title: 'Ar esate tikri?',
            text: 'Dėmesio duomenys bus pašalinti!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Atšaukti',
            confirmButtonColor: '#268b29',
            cancelButtonColor: '#ffd700',
            confirmButtonText: 'Taip, pašalinti!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch('http://localhost:3001/api/v1/expense/' + id, {
                    method: 'DELETE',
                }).then(() => {
                    setExpense(expense.filter((expense) => expense.id !== id));
                    fetchData();
                    Swal.fire({
                        title: 'Jūsų duomenys buvo pašalinti!',
                        icon: 'success',
                        confirmButtonText: 'Gerai',
                    });
                });
            }
        }).then(()=>{
            const postURLLog = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
            fetch(postURLLog, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        UserId: props.currentUser._id,
                        ActionType: "Ištrynė išlaidą",
                        Timestamp: Date.now(),
                        Data: deletedExpense
                    })

                    }
                );
            });
        // alert('Your incomes was deleted successfully');

        // /* setEditing(false);

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
		<div className="expenseCategorySelector">
            <form className='container-fluid' onSubmit={submitHandler}>
                <div className='new-expense__controls row d-flex justify-content-center'>
                    <div className='new-expense__control col-5'>
                        <label className='new-expense__category'>
                            {/* Kategorija */}
                        </label>
                        <select required
                            onChange={categoryChangeHandler}
                            value={enteredCategory}
                        >
                            <option selected="true" hidden value="">-----------</option>
                            {!isLoading &&
                            categories.map((category)=>(
                                category.categoryType ==="expense"&&
                                    <option value={category.categoryName}>{category.categoryName}</option>
                            ))}
                            {/* <option value='food'>Maistas</option>
                            <option value='clothes'>Drabužiai</option>
                            <option value='hygiene'>Higiena</option>
                            <option value='transport'>Transportas</option>
                            <option value='automotive'>Automobilis</option>
                            <option value='municipal'>
                                Komunaliniai mokesčiai
                            </option>
                            <option value='services'>Paslaugos</option>
                            <option value='education'>Mokymai</option>
                            <option value='hobby'>Pomėgiai</option>
                            <option value='entertainment'>Pramogos</option>
                            <option value='pets'>Augintiniai</option>
                            <option value='household'>Namų išlaidos</option>
                            <option value='garden'>Sodas</option> */}
                        </select>
                    </div>
                    <div className='new-expense__control col-5'>
                        <label>
                        {/* Suma */}
                        </label>
                        <input id='sum'
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
                    <div className='new-expense__control col-5'>
                        <label>
                        {/* Data */}
                        </label>
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
                    <div className='new-expense__control col-5'>
                        <label>
                        {/* Pavadinimas */}
                        </label>
                        <input id='expenseTitle'
                            type='text'
                            name='expenseName'
                            required
                            maxlength='20'
                            minlength='3'
                            placeholder='Išlaidų pavadinimas'
                            pattern='^[\p{L},.0-9\s-]+$'
                            value={enteredTitle}
                            onChange={titleChangeHandler}
                        />
                    </div>
                </div>
                <div className='new-expense__actions'>
                    <button>
                        {editing ? <>Atnaujinti</> : <>Pridėti</>}
                    </button>
                    {editing && (
                        <button
                            type='cancel'
                            variant='contained'
                            className='btn my-cusomized-button'
                            onClick={() => {
                                cancelUpdate();
                            }}
                        >
                            Atšaukti
                        </button>
                    )}
                </div>
            </form>
            <ExpenseList
                expense={expense}
                editExpense={editRow}
                deleteExpense={deleteExpense}
            />
        </div>
	);
};

export default ExpenseForm;
