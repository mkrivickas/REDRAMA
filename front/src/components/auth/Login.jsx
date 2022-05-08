import React, {useState} from 'react'
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import './Login.css';


const Login = ({setCurrentUser}) => {
    let [loggedUser, setLoggedUser] = useState()

    let [rememberMe, setRememberMe] = useState(false)
/*     let [loginErrs, setLoginErrs] = useState(false) */



    function login(e){
/*         setLoginErrs(false) */
        e.preventDefault();
        let formData = e.target;
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email.value
          })
        };
        fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.status === "Success"){
            const passHash = bcrypt.hashSync(formData.password.value, data.user.salt)
            const passHash2 = bcrypt.hashSync(passHash, data.user.salt)
            if(passHash2 === data.user.password){
              setCurrentUser(data.user)
              console.log(data.user)
              if(rememberMe){
                localStorage.setItem("user", data.user._id)
              }
            }else{
              Swal.fire({
                title: 'Neteisingai suvestas el. paštas arba slaptažodis',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Gerai',
            })
            }
          }else{
/*               setLoginErrs(true) */
              Swal.fire({
                title: 'Neteisingai suvestas el. paštas arba slaptažodis',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Gerai',
            })
            
          }
        });
      }



  return (
    <div className='auths'>
    <div className="authContainer">
    <h1>Prisijungti</h1>
{/*         <div className='errs'>
            {loginErrs && <h5>El. Paštas arba slaptažodis neteisingi</h5>}
        </div> */}
    {loggedUser && <h1>Prisijunges vartotojas :{loggedUser.name}</h1>}
    <form onSubmit={(e)=>{login(e)}}>
      <input type="email" name="email" required id="loginEmail" maxLength="40" placeholder='El. Paštas'>
      </input>
      <input type="password" name="password" required id="loginPass" maxLength="40" placeholder='Slaptažodis'>
      </input>
      <div className='loginRememberMe'>
      <input type="checkbox" id="loginRememberMe" name="rememberMe" onClick={()=>{setRememberMe(!rememberMe)}}></input><label htmlFor="rememberMe">Prisiminti mane</label>
      </div>
      <div className='submitBtns'>
      <input type="submit" id="loginSubmit" value="Prisijungti"></input>
      </div>
    </form>
    <div className="loginLinkRegister">Neturite vartotojo paskyros? <Link className='MainLink' to="/register">Registruotis</Link></div>
    </div>
    </div>
  )
}

export default Login