import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import './Users.css';

const validUserName = new RegExp(
    '^[a-zA-ZąčęėįšųūĄČĘĖĮŠŲŪžŽ ]{3,30}$'
  );
  const validEmail = new RegExp(
    '^[a-zA-Z0-9].{2,39}$'
  );
  const validPassword = new RegExp(
    '^(?=.*[A-Z]).{0,39}$'
  );

const Users = () => {
    let [users, setUsers] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [isAddFormOpened, setIsAddFormOpened] = useState(false);
    let [userAddType, setUserAddType] = useState("admin");
    let [userAddName, setUserAddName] = useState("");
    let [userAddEmail, setUserAddEmail] = useState("");
    let [userAddPassword, setUserAddPassword] = useState("");
    let [isEditing, setIsEditing] = useState(false);
    let [editingUser, setEditingUser] = useState("");

    const fetchData = () =>{
        fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/users')
                .then(response => response.json())
                .then(data => {
                setUsers(data.data.users);
                setIsLoading(false);
                console.log(data.data.users);
                });
    };

    useEffect(() => {
      fetchData();
    }, []);
    

    const deleteUser = (userId) =>{
    const postURL = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/users';
    Swal.fire({
      title: 'Ar esate tikri?',
      text: 'Dėmesio, vartotojas bus pašalintas!',
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
              id: userId
          }),
      }).then(()=>{
        fetchData();
        Swal.fire('Pašalinta!', 'Vartotojas buvo pašalintas.', 'success');
      });
      }
    });

    };

    const addUser = (e) =>{
        e.preventDefault();
        let isValid = true;
        let formData = e.target;
        const salt = bcrypt.genSaltSync(10);
        if(!validUserName.test(userAddName)){
          isValid = false;
          Swal.fire({
            title: 'Klaida',
            text: 'Vartotojo vardas turi būti nuo 3 iki 40 simbolių, gali susidaryti tik is raidžių ir skaičių',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Gerai'
          })
        }
        if(!validEmail.test(userAddEmail)){
            isValid = false;
            Swal.fire({
                title: 'Klaida',
                text: 'El. Paštas turi buti ne ilgesnis nei 40 simbolių.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Gerai'
              })
        }
        if(!validPassword.test(userAddPassword)){
            isValid = false;
            Swal.fire({
                title: 'Klaida',
                text: 'Slaptažodis turi turėti nors vieną didžiają raidę ir turi būti ne ilgesnis nei 40 simbolių',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Gerai'
              })
        }
          if (isValid){
            if(isEditing){
            const passHash = bcrypt.hashSync(userAddPassword, salt);
            const passHash2 = bcrypt.hashSync(passHash, salt);
            const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                name: userAddName,
                email: userAddEmail,
                type: userAddType,
                password: passHash2,
                salt: salt
              })
            };
            console.log(editingUser._id)
            fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/register/'+ editingUser._id, requestOptions)
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                  if(data.status === "success"){
                    fetchData();
                    setUserAddEmail("");
                    setEditingUser("");
                    setIsAddFormOpened(false);
                    setUserAddName("");
                    setUserAddPassword("");
                    setIsEditing(false);
                    Swal.fire({
                        title: 'Puiku!',
                        text: 'Vartotojas atnaujintas!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Gerai'
                      });
                  }
                });
              
            }else{

            const passHash = bcrypt.hashSync(userAddPassword, salt);
            const passHash2 = bcrypt.hashSync(passHash, salt);
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                name: userAddName,
                email: userAddEmail,
                type: userAddType,
                password: passHash2,
                salt: salt
              })
            };
            fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/register', requestOptions)
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                  if(data.status === "success"){
                    fetchData();
                    userAddName = "";
                    userAddEmail= "";
                    userAddPassword = "";
                    Swal.fire({
                        title: 'Puiku!',
                        text: 'Vartotojas pridėtas!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Gerai'
                      })
                  } else if(data.message === "user already exists"){
                    Swal.fire({
                        title: 'Klaida',
                        text: 'Vartotojas jau egzistuoja!',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Gerai'
                      })
                  }
                });
              }
          }
    };

    const editUser = (user) =>{
      setIsAddFormOpened(true);
      setIsEditing(true);
      setEditingUser(user);
      setUserAddEmail(user.email);
      setUserAddName(user.name);
    };

  return (
    <div className='usersPage'>
        <div className='usersPageNav'>
            <button onClick={()=>{setIsAddFormOpened(!isAddFormOpened)}}>{isAddFormOpened? "Atšaukti pridėjimą": "Pridėti naują vartotoją"}</button>
            {isAddFormOpened && 
            <div className='usersForm'>
            <form  onSubmit={(e)=>{addUser(e)}}>
                <input type="text" id="userAddName" value={userAddName} onChange={(e)=>{setUserAddName(e.target.value)}} className='usersPageInputUser'  name='userAddName' minLength="3" maxLength="30" placeholder='Vartotojo vardas'required></input>
                <input type="email" id="userAddEmail" value={userAddEmail} onChange={(e)=>{setUserAddEmail(e.target.value)}} className='usersPageInputEmail'   name="userAddEmail" placeholder='El. paštas' required></input>
                <input type="password" id="userAddPassword" value={userAddPassword} onChange={(e)=>{setUserAddPassword(e.target.value)}} className='usersPageInputPassword'  name="userAddPassword" placeholder='Slaptažodis' required></input>
                <select onChange={(e)=>{(setUserAddType(e.target.value))}} value={userAddType}>
                  <option value="admin">Administratorius</option>
                  <option value="user">Vartotojas</option>
                </select>
                <button type="submit" value="Pridėti">Pridėti</button>
            </form></div>
            }
        </div>
        <div className='usersPageList'>
            {!isLoading && 
            users.map((user)=>(
                <div className="usersPageSingleUser">
                    <div className={user.type === "admin"? "usersSingleUserGold usersNameAndEmail" :"usersSingleUserGreen usersNameAndEmail"}>
                        <div>Vartotojas: {user.name}</div>
                        <div>E. Paštas: {user.email}</div>
                    </div>
                <div > {user.type ==="admin"? "Administratorius": "Vartotojas"}</div>
                <div className='usersPageSingleBtns'>
                    <button onClick={()=>{deleteUser(user._id)}}>Pašalinti</button>
                    <button onClick={()=>{editUser(user)}}>Redaguoti</button>
                    <button>{user.type === "admin"? "Padaryti vartotoju": "Padaryti administratorium"}</button>
                </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Users