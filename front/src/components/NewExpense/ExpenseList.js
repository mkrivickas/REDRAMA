import React, {useState, useEffect} from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './ExpenseList.css';

const ExpenseList = ({ tempExpense, setTempExp, expense, setExpense, deleteExpense, editExpense, categories }) => {

    let [categoryFilter, setCategoryFilter] = useState("")

    useEffect(() => {
        let tempExpList = [];
        console.log(categoryFilter);
      if(categoryFilter){
        setExpense("");
        tempExpense.forEach((expense)=>{
            if(expense.Category=== categoryFilter){
                tempExpList.push(expense);
            }
        });
        setExpense(tempExpList);
      }else if(categoryFilter===""){
        setExpense(tempExpense);
      }
    }, [categoryFilter]);
    

    function cancelFilter(){
        setCategoryFilter("");
    }

    return(

    <div className='ExpenseList-container'>
        <div className='ExpenseListCategorySort'>
            <select onChange={(e)=>{setCategoryFilter(e.target.value)}}value={categoryFilter} id="expenseCategoryFilter" className='expenseCategoryFilter'>
                <option value={""} hidden>Filtruoti pagal kategoriją</option>
                {categories.map((category)=>(
                    category.categoryType === "expense"&& <option value={category.categoryName}>{category.categoryName}</option>
                ))}
            </select>
            {categoryFilter && <button type='button' className='expenseCategoryFilterCancel' onClick={()=>{cancelFilter()}}>Atšaukti filtravimą</button>}
        </div>
        <div className='ExpenseList-row'>
            <label className='ExpenseListLabels expenseListFirst'>Data</label>
            <label className='ExpenseListLabels'>Kategorija</label>
            <label className='ExpenseListLabels'>Pavadinimas</label>
            <label className='ExpenseListLabels'>Suma</label>
            <label className='ExpenseListLabels expenseListLast'>Veiksmai</label>
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
    </div>  )
};

export default ExpenseList;
