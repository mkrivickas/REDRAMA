import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2';
import './Categories.css';
import { FaTrash, FaRegEdit } from 'react-icons/fa';

const validCategory = new RegExp(
  '^[a-zA-ZąčęėįšųūĄČĘĖĮŠŲŪžŽ ]{3,30}$'
);


const Categories = () => {
  let [categories, setCategories] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let [isAddFormOpened, setIsAddFormOpened] = useState(false);
  let [isIncomesPicked, setIsIncomesPicked] = useState(false);
  let [isExpensesPicked, setIsExpensesPicked] = useState(false);
  let [categoryName, setCategoryName] = useState("");
  let [categoryType, setCategoryType] = useState("income");
  let [pickedCategory, setPickedCategory] = useState("");
  let [isEditing, setIsEditing] = useState(false);
  let [editingCategory, setEditingCategory] = useState("");


  function addCategory(e){
    e.preventDefault();
    let isValid = true;
    if (categoryName.length === 0 || (categoryName.length > 0 && categoryName.trim().length)){
    if(!validCategory.test(categoryName)){
      isValid = false;
      Swal.fire({
        title: 'Klaida',
        text: 'Kategorija negali tureti specialių simbolių arba skaičių, gali būti nuo 3 iki 30 simbolių',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Gerai'
      })
    }
    if (isValid){
    if(isEditing){
          const postURL = 'http://localhost:3001/api/v1/category/'+editingCategory._id;
          fetch(postURL, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryName: categoryName,
                categoryType: categoryType
            }),
        }).then(response => response.json()).then(data => {
          console.log(data.status);
          if (data.status === "fail"){
            Swal.fire({
              title: 'Klaida',
              text: 'Kategorija su tokiu pavadinimu jau egzistuoja!',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Gerai'
            })
          }
          fetchData();
          setCategoryName("");
          setIsEditing("");
          setIsAddFormOpened(false);
        });
    }else{
      const postURL = 'http://localhost:3001/api/v1/category/';
      fetch(postURL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName: categoryName,
          categoryType: categoryType
        }),
    }).then(response => response.json()).then(data => {
      console.log(data.status);
      if (data.status === "fail"){
        Swal.fire({
          title: 'Klaida',
          text: 'Kategorija su tokiu pavadinimu jau egzistuoja!',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Gerai'
        })
      }
      fetchData();
      setCategoryName("");
    });
    }
    }
  }else{
    isValid = false;
      Swal.fire({
        title: 'Klaida',
        text: 'Kategorija negali tureti specialių simbolių arba skaičių, gali būti nuo 3 iki 30 simbolių(Negali būti vien tarpai)',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Gerai'
      });
  }
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
  }, []);


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
        Swal.fire({
          text: 'Kategorija buvo pašalinta!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Gerai!'
        });
      });
      }
    });
  }

  function pickCategory(categoryName){
    if (categoryName === "incomes"){
      if(pickedCategory === "incomes"){
        setIsIncomesPicked(false);
        setPickedCategory("");
      }else{
        setIsExpensesPicked(false);
        setIsIncomesPicked(true);
        setPickedCategory(categoryName)
      }
    }else{
      if(pickedCategory === "expenses"){
        setIsExpensesPicked(false);
        setPickedCategory("");
      }else{
        setIsIncomesPicked(false);
        setIsExpensesPicked(true);
        setPickedCategory(categoryName);
      }
    }
  }
  function editCategory(category){
    setIsEditing(true);
    setIsAddFormOpened(true);
    setEditingCategory(category);
    setCategoryName(category.categoryName);
    setCategoryType(category.categoryType);


  }
  function cancelEditing(){
    setIsEditing(false);
    setIsAddFormOpened(false);
    setEditingCategory("");
  }

  const categoryListItem = (category) => {
    return(
      <div className='categorySingleCategory' key={category._id}>
              <div className='categorySingleName'>{category.categoryName}, Tipas: {category.categoryType ==="income" ? <>Pajamos</>: <>Išlaidos</>}</div> 
              <button onClick={()=>{deleteCategory(category._id)}}><FaTrash /></button>
              <button onClick={()=>{editCategory(category)}}><FaRegEdit /></button>
      </div>
    )
  }
  
  const openAddForm = () => {
    if (isEditing){
      setIsEditing(false);
    }
    setIsAddFormOpened(!isAddFormOpened)
  }
  return (
    <div className='categoriesPage'>
    <button onClick={()=>{openAddForm()}} className="categoryAddNewButton">{!isAddFormOpened || isEditing ? <>Pridėti naują</> : <>Atšaukti pridejimą</>}</button>
    {isEditing && <button type='button' value="Atšaukti redagavimą" className='categoryCancelEditingBtn' onClick={()=>{cancelEditing()}}>Atšaukti redagavimą</button>}
    <button onClick={()=>{pickCategory("incomes")}} className="categoryAddNewButton">{!isIncomesPicked ? <>Rodyti tik pajamų kategorijas</> : <>Atšaukti filtravimą</>}</button>
    <button onClick={()=>{pickCategory("expenses")}} className="categoryAddNewButton">{!isExpensesPicked ? <>Rodyti tik išlaidų kategorijas</> : <>Atšaukti filtravimą</>}</button>
    {isAddFormOpened && 
    <div className='categoryForm'>
      <form  onSubmit={(e)=>{addCategory(e)}}>
        <input type="text" id="categoryAddName" onChange={(e)=>{setCategoryName(e.target.value)}} value={categoryName} name='categoryAddName' minLength="3" maxLength="30" placeholder='Kategorijos pavadinimas'required></input>
        <select id="categoryAddType" onChange={(e)=>{setCategoryType(e.target.value)}} value={categoryType} name="categoryAddType">
          <option value="income">Pajamos</option>
          <option value="expense">Išlaidos</option>
        </select>
        <button type="submit" id="categoryAddSubmitBtn" value="Pridėti">Pridėti</button>
      </form></div>
      }

      {!isLoading &&
      <div className='categoryList'>
        {categories.map((category)=>(
          pickedCategory ? (
            pickedCategory === "incomes" ?(
              category.categoryType === "income" &&(
                categoryListItem(category)
              )
            ):(
              category.categoryType === "expense"&&(
                categoryListItem(category)
              )
            )

          ):(
            categoryListItem(category)
          )
        ))}</div>}


    </div>
  )
}

export default Categories