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
                                    <button
                                        onClick={() => {
                                            props.editExpense(expense);
                                            /* 									props.openModal(); */
                                        }}
                                        className='ExpenseListEdit-button text-white ms-3'
                                    >
                                        <FaRegEdit />
                                    </button>
                                </td>
                                <td className='ExpenseAmount-List text-white'>
                                    {expense.expenseCategory}
                                </td>
                                <td>
                                    <div className='ExpenseName-List text-white'>
                                        {expense.expenseName}
                                    </div>
                                    <div className='ExpenseDate-List text-white'>
                                        {expense.expenseDate.slice(0, 10)}
                                    </div>
                                </td>
                                
                                <td className='ExpenseAmount-List text-white'>
                                    {expense.expenseAmount}€
                                </td>
                                
                                <td>
                                    <button
                                        onClick={() =>
                                            props.deleteExpense(expense._id)
                                        }
                                        className='ExpenseListDelete-button ms-3'
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
