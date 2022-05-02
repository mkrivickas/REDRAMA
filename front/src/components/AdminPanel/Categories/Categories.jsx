import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2';
import './Categories.css';

const Categories = () => {
  let [categories, setCategories] = useState("");
  let [isLoading, setIsLoading] = useState(true)
  let [isAddFormOpened, setIsAddFormOpened] = useState(false)


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
          categoryName: formData.categoryAddName.value
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
  
  return (
    <div className='categoriesPage'>
    <button onClick={()=>{setIsAddFormOpened(!isAddFormOpened)}}>{!isAddFormOpened ? <>Pridėti naują</> : <>Atšaukti</>}</button>
    {isAddFormOpened && 
      <form className='categoryForm' onSubmit={(e)=>{addCategory(e)}}>
        <input type="text" id="categoryAddName" name='categoryAddName' minLength="3" maxLength="20" placeholder='Kategorijos pavadinimas'required></input>
        <button type="submit" value="Pridėti">Pridėti</button>
      </form>
      }

      {!isLoading &&
      <div className='categoryList'>
        {categories.map((category)=>(
          <div className='categorySingleCategory'><div className='categorySingleName'>{category.categoryName}</div> <button onClick={()=>{deleteCategory(category._id)}}>Pašalinti</button></div>
        ))}</div>}


    </div>
  )
}

export default Categories