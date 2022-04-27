import React, { useState } from 'react';
import swal from 'sweetalert';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('');
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

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate),
            category: enteredCategory,
        };

        // Once the form has been submitted, this function will post to the backend
        const postURL = 'http://localhost:3001/api/v1/expense/'; //Our previously set up route in the backend
        fetch(postURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // We should keep the fields consistent for managing this data later
                expenseName: enteredTitle,
                expenseAmount: enteredAmount,
                expenseDate: enteredDate,
                expenseCategory: enteredCategory,
            }),
        }).then(() => {
            // Once posted, the user will be notified
            swal({
                title: 'Šaunu!',
                text: 'Jūsų išlaidos įvestos!',
                icon: 'success',
                button: 'Gerai',
            });
            // alert('Your incomes was added successfully');
        });

        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
        setEnteredCategory('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Išlaidos</label>
                    <input
                        type='text'
                        name='expenseName'
                        required
                        maxlength='40'
                        minlength='3'
                        placeholder='Išlaidų pavadinimas'
                        pattern='^[a-zA-Z0-9_.-]*$'
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Suma</label>
                    <input
                        type='number'
                        name='expenseAmount'
                        required
                        min='0.01'
                        step='0.01'
                        maxlength='7'
                        minlength='1'
                        placeholder='Išlaidų suma, €'
                        value={enteredAmount}
                        onChange={amountChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Data</label>
                    <input
                        type='date'
                        required
                        name='expenseDate'
                        min='2019-01-01'
                        max='2099-12-31'
                        placeholder='MMMM-MM-DD'
                        value={enteredDate}
                        onChange={dateChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Kategorija</label>
                    <select onChange={categoryChangeHandler}>
                        <option value='food'>Maistas</option>
                        <option value='clothes'>Drabužiai</option>
                        <option value='hygiene'>Higiena</option>
                        <option value='transport'>Transportas</option>
                        <option value='automotive'>Automobilis</option>
                        <option value='municipal'>Komunalkos</option>
                        <option value='services'>Paslaugos</option>
                        <option value='education'>Mokymai</option>
                        <option value='hobby'>Pomėgiai</option>
                        <option value='entertainment'>Pramogos</option>
                        <option value='pets'>Augintiniai</option>
                        <option value='household'>Namų išlaidos</option>
                        <option value='garden'>Sodas</option>
                    </select>
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='submit'>Pridėti</button>
            </div>
        </form>
    );
};

export default ExpenseForm;