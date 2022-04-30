import React, {useState} from 'react'

const AdminPanel = () => {
    let [adminPage, setAdminPage] = useState("users")
  return (
    <div>
        <h1>Administracinis puslapis</h1>
        <button onClick={()=>{setAdminPage("categories")}}>Kategorijos</button>
        <button onClick={()=>{setAdminPage("users")}}>Vartotojai</button>
        <button onClick={()=>{setAdminPage("history")}}>Istorija</button>
        {
            adminPage === "categories" && 
                <div className='adminCategoriesPanel'>
                    Kategorijos
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