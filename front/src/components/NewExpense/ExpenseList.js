import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './ExpenseList.css';

const ExpenseList = ({ expense, deleteExpense, editExpense }) => (
    <div className='ExpenseList-container'>
        <div className='ExpenseList-row'>
            <label className='ExpenseListLabels'>Data</label>
            <label className='ExpenseListLabels'>Kategorija</label>
            <label className='ExpenseListLabels'>Pavadinimas</label>
            <label className='ExpenseListLabels'>Suma</label>
            <label className='ExpenseListLabels'>Veiksmai</label>
        </div>
        {expense.length > 0 ? (
            expense.map((expense) => (
                <div className='ExpenseList-row' key={expense._id}>
                    <div className='ExpenseDate-List'>
                        {expense.Date.slice(0, 10)}
                    </div>
                    <div className='ExpenseCategory-List'>
                        {expense.Category}
                    </div>
                    <div className='ExpenseName-List'>{expense.Name}</div>
                    <div className='ExpenseAmount-List'>{expense.Amount}€</div>
                    <div className='ExpenseListOptionsButtons'>
                        <button
                            className='ExpenseListEdit-button'
                            onClick={() => {
                                window.scrollTo(0, 0);
                                editExpense(expense);
                                /* 									props.openModal(); */
                            }}
                        >
                            <FaRegEdit />
                        </button>
                        <button
                            onClick={() => deleteExpense(expense._id, expense)}
                            className='ExpenseListDelete-button'
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div>Nėra išlaidų</div>
        )}
    </div>
);

export default ExpenseList;
