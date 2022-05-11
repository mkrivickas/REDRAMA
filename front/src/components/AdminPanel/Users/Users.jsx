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

    }

    const addUser = (e) =>{
        e.preventDefault();
        let isValid = true;
        let formData = e.target;
        const salt = bcrypt.genSaltSync(10);
        console.log(formData.userAddPassword.value)
        if(!validUserName.test(formData.userAddName.value)){
          isValid = false;
          Swal.fire({
            title: 'Klaida',
            text: 'Kategorija negali tureti specialių simbolių arba skaičių, gali būti nuo 3 iki 30 simbolių',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Gerai'
          })
        }
        if(!validEmail.test(formData.userAddEmail.value)){
            isValid = false;
            Swal.fire({
                title: 'Klaida',
                text: 'Kategorija negali tureti specialių simbolių arba skaičių, gali būti nuo 3 iki 30 simbolių',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Gerai'
              })
          }
          if(!validPassword.test(formData.userAddPassword.value)){
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
            const passHash = bcrypt.hashSync(formData.userAddPassword.value, salt);
            const passHash2 = bcrypt.hashSync(passHash, salt);
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                name: formData.userAddName.value,
                email: formData.userAddEmail.value,
                type: "user",
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
                    formData.userAddEmail.value = "";
                    formData.userAddName.value = "";
                    formData.userAddPassword.value = "";
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
                })
          }
    }

  return (
    <div className='usersPage'>
        <div className='usersPageNav'>
            <button onClick={()=>{setIsAddFormOpened(!isAddFormOpened)}}>{isAddFormOpened? "Atšaukti pridėjimą": "Pridėti naują vartotoją"}</button>
            {isAddFormOpened && 
            <div className='usersForm'>
            <form  onSubmit={(e)=>{addUser(e)}}>
                <input type="text" id="userAddName" className='usersPageInputUser'  name='userAddName' minLength="3" maxLength="30" placeholder='Vartotojo vardas'required></input>
                <input type="email" id="userAddEmail" className='usersPageInputEmail'   name="userAddEmail" placeholder='El. paštas' required></input>
                <input type="password" id="userAddPassword" className='usersPageInputPassword'  name="userAddPassword" placeholder='Slaptažodis' required></input>
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
                    <button>Redaguoti</button>
                    <button>{user.type === "admin"? "Padaryti vartotoju": "Padaryti administratorium"}</button>
                </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Users