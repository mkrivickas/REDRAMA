import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './ExpenseList.css';

const ExpenseList = ({ expense, deleteExpense, editExpense }) => (
    <div className='ExpenseList-container fluid'>
        <div className='ExpenseList-row d-flex col-12'>
            <label className='ExpenseListLabels col-2 text-start'>Data</label>
            <label className='ExpenseListLabels col-2 text-start'>
                Kategorija
            </label>
            <label className='ExpenseListLabels col-3 text-start'>
                Pavadinimas
            </label>
            <label className='ExpenseListLabels col-1 text-start'>Suma</label>
            <label className='ExpenseListLabels col-2 text-center'>
                Veiksmai
            </label>
        </div>
        {expense.length > 0 ? (
            expense.map((expense) => (
                <div className='ExpenseList-row d-flex' key={expense._id}>
                    <div className='ExpenseDate-List col-2 text-start'>
                        {expense.Date.slice(0, 10)}
                    </div>
                    <div className='ExpenseCategory-List col-2 text-start'>
                        {expense.Category}
                    </div>
                    <div className='ExpenseName-List col-3 text-start'>
                        {expense.Name}
                    </div>
                    <div className='ExpenseAmount-List col-2 text-start'>
                        {expense.Amount}€
                    </div>
                    <div className='ExpenseListOptionsButtons d-flex col-2 text-center'>
                        <div>
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
                        </div>
                        <div>
                            <button
                                onClick={() => deleteExpense(expense._id)}
                                className='ExpenseListDelete-button'
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div>Nėra išlaidų</div>
        )}
    </div>
);

export default ExpenseList;
