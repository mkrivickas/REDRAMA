import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './ExpenseList.css';

const ExpenseList = (props) => (
    <div className='ExpenseList-container fluid'>
        <div className='ExpenseList-row'>
            <table className='ExpenseList-table'>
                <tbody>
                    {props.expense.length > 0 ? (
                        props.expense.map((expense) => (
                            <tr key={expense._id}>
                                
                                <td>
                                    <div className='ExpenseCategory-List'>
                                    <button
                                        className='ExpenseListEdit-button text-white ms-3'
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            props.editExpense(expense);
                                        }}
                                    >
                                        <FaRegEdit />
                                    </button>
                                </td>
                                <td>
                                    <div className='ExpenseCategory-List text-white'>
                                        {expense.Category}
                                    </div>
                                </td>
                                <td>
                                    <div className='ExpenseName-List'>
                                        {expense.Name}
                                    </div>
                                    <div className='ExpenseDate-List'>
                                        {expense.Date.slice(0, 10)}
                                    </div>
                                </td>
                                <td className='ExpenseAmount-List'>
                                    {expense.Amount}€
                                </td>
                                <td>
                                    <button
                                        className='ExpenseListEdit-button'
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            props.editExpense(expense);
                                            /* 									props.openModal(); */
                                        }}
                                    >
                                        <FaRegEdit />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            props.deleteExpense(expense._id)
                                        }
                                        className='ExpenseListDelete-button'
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>Nėra pajamų</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default ExpenseList;
