import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2';
import './Categories.css';

const Categories = () => {
  let [categories, setCategories] = useState("");
  let [isLoading, setIsLoading] = useState(true)
  let [isAddFormOpened, setIsAddFormOpened] = useState(false)
  let [isIncomesPicked, setIsIncomesPicked] = useState(false)
  let [isExpensesPicked, setIsExpensesPicked] = useState(false)
  let [pickedCategory, setPickedCategory] = useState("")


  function addCategory(e){
    e.preventDefault();
    let formData = e.target
    console.log(formData.categoryAddName.value)

  // Once the form has been submitted, this function will post to the backend
  const postURL = 'http://localhost:3001/api/v1/category/'; //Our previously set up route in the backend
  fetch(postURL, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          // We should keep the fields consistent for managing this data later
          categoryName: formData.categoryAddName.value,
          categoryType: formData.categoryAddType.value
      }),
  }).then(()=>{
    fetchData();
    formData.categoryAddName.value = ""
  })
  }

  function fetchData(){
    fetch('http://localhost:3001/api/v1/category/')
    .then(response => response.json())
    .then(data => {
      setCategories(data.data.categories);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, [])


  function deleteCategory(id){
    const postURL = 'http://localhost:3001/api/v1/category/';
    console.log(id)
    Swal.fire({
      title: 'Ar esate tikri?',
      text: 'Dėmesio, kategorija bus pašalinta!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Atšaukti',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Taip, pašalinti!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch(postURL, {
          method: 'DELETE',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id: id
          }),
      }).then(()=>{
        fetchData();
        Swal.fire('Pašalinta!', 'Kategorija buvo pašalinta.', 'success');
      })
      }
    });
  }

  function pickCategory(categoryName){
    if (categoryName == "incomes"){
      if(pickedCategory == "incomes"){
        setIsIncomesPicked(false)
        setPickedCategory("")
      }else{
        setIsExpensesPicked(false)
        setIsIncomesPicked(true)
        setPickedCategory(categoryName)
      }
    }else{
      if(pickedCategory == "expenses"){
        setIsExpensesPicked(false)
        setPickedCategory("")
      }else{
        setIsIncomesPicked(false)
        setIsExpensesPicked(true)
        setPickedCategory(categoryName)
      }
    }
  }
  
  return (
    <div className='categoriesPage'>
    <button onClick={()=>{setIsAddFormOpened(!isAddFormOpened)}} className="categoryAddNewButton">{!isAddFormOpened ? <>Pridėti naują</> : <>Atšaukti</>}</button>
    <button onClick={()=>{pickCategory("incomes")}} className="categoryAddNewButton">{!isIncomesPicked ? <>Pajamų kategorijos</> : <>Atšaukti</>}</button>
    <button onClick={()=>{pickCategory("expenses")}} className="categoryAddNewButton">{!isExpensesPicked ? <>Islaidų kategorijos</> : <>Atšaukti</>}</button>
    {isAddFormOpened && 
    <div className='categoryForm'>
      <form  onSubmit={(e)=>{addCategory(e)}}>
        <input type="text" id="categoryAddName" name='categoryAddName' minLength="3" maxLength="30" placeholder='Kategorijos pavadinimas'required></input>
        <select id="categoryAddType" name="categoryAddType">
          <option value="income">Pajamos</option>
          <option value="expense">Išlaidos</option>
        </select>
        <button type="submit" value="Pridėti">Pridėti</button>
      </form></div>
      }

      {!isLoading &&
      <div className='categoryList'>
        {categories.map((category)=>(
          pickedCategory ? (
            pickedCategory == "incomes" ?(
              category.categoryType == "income" &&(
                <div className='categorySingleCategory'><div className='categorySingleName'>{category.categoryName}, Tipas: {category.categoryType =="income" ? <>Pajamos</>: <>Išlaidos</>}</div> <button onClick={()=>{deleteCategory(category._id)}}>Pašalinti</button></div>
              )
            ):(
              category.categoryType == "expense"&&(
                <div className='categorySingleCategory'><div className='categorySingleName'>{category.categoryName}, Tipas: {category.categoryType =="income" ? <>Pajamos</>: <>Išlaidos</>}</div> <button onClick={()=>{deleteCategory(category._id)}}>Pašalinti</button></div>
              )
            )

          ):(
            <div className='categorySingleCategory'><div className='categorySingleName'>{category.categoryName}, Tipas: {category.categoryType =="income" ? <>Pajamos</>: <>Išlaidos</>}</div> <button onClick={()=>{deleteCategory(category._id)}}>Pašalinti</button></div>
          )
        ))}</div>}


    </div>
  )
}

export default Categories