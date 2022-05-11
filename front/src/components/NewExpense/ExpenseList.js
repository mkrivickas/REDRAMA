import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './ExpenseList.css';

const ExpenseList = ({ expense, deleteExpense, editExpense }) => (
    <div className='ExpenseList-container fluid'>
        <div className='ExpenseList-row' key={expense._id}>
            <div className='ExpenseDate-List'>{expense.Date.slice(0, 10)}</div>
            <div className='ExpenseCategory-List'>{expense.Category}</div>
            <div className='ExpenseName-List'>{expense.Name}</div>
            <div className='ExpenseAmount-List'>{expense.Amount}€</div>
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
            // // ////////////////////////////////
            {/* <table className='ExpenseList-table'>
                <tbody>
                    {props.expense.length > 0 ? (
                        props.expense.map((expense) => (
                            <tr key={expense._id}>
                                <td></td>
                                <td></td>

                                <td></td>
                                <td></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>Nėra pajamų</td>
                        </tr>
                    )}
                </tbody>
            </table> */}
            ////////////////////////////////
        </div>
    </div>
);

export default ExpenseList;
