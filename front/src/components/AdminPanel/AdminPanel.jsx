import React, {useState} from 'react'
import Categories from './Categories/Categories'
import './AdminPanel.css';

const AdminPanel = () => {
    let [adminPage, setAdminPage] = useState("users")
  return (
    <div className='adminPage'>
        <h1>Administracinis puslapis</h1>
        <div className='adminNav'>
        <button onClick={()=>{setAdminPage("categories")}}>Kategorijos</button>
        <button onClick={()=>{setAdminPage("users")}}>Vartotojai</button>
        <button onClick={()=>{setAdminPage("history")}}>Istorija</button></div>
        {
            adminPage === "categories" && 
                <div className='adminCategoriesPanel'>
                    <Categories/>
                </div>
        }
        {
            adminPage === "users" && 
                <div className='adminUsersPanel'>
                    Users
                </div>
        }
        {
            adminPage === "history" && 
                <div className='adminHistoryPanel'>
                    History
                </div>
        }
    </div>
  )
}

export default AdminPanel