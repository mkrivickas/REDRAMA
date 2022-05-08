import React, {useState, useEffect} from 'react'
import bcrypt from 'bcryptjs'
import './Register.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'


const validUsername = new RegExp(
    '^[a-zA-Z0-9]{2,39}$'
  )
  
  const validEmail = new RegExp(
    '^[a-zA-Z0-9].{2,39}$'
  )
  const validPassword = new RegExp(
    '^(?=.*[A-Z]).{0,39}$'
  )

const Register = ({setCurrentUser}) => {
  let [isToggled, setIsToggled] = useState(false)
  let [showPassword, setShowPass] = useState("password")
  let [passErr, setPassErr] = useState(false)
  let [emailErr, setEmailErr] = useState(false)
  let [usernameErr, setUsernameErr] = useState(false)
  let [alreadyExistsErr, setAlreadyExistsErr] = useState(false)
  let [loggedUser, setLoggedUser] = useState()

  function register(e){
    setEmailErr(false)
    setPassErr(false)
    setUsernameErr(false)
    setAlreadyExistsErr(false)
    const salt = bcrypt.genSaltSync(10)
    let formData = e.target;
    let isValid = true;
    if(!validUsername.test(formData.username.value)){
      isValid = false;
      setUsernameErr(true)
    }
    if(!validPassword.test(formData.password.value)){
      isValid = false;
      setPassErr(true)
    }
    if(!validEmail.test(formData.email.value)){
      isValid = false;
      setEmailErr(true)
    }
    e.preventDefault();
    if (isValid){
      const passHash = bcrypt.hashSync(formData.password.value, salt)
      const passHash2 = bcrypt.hashSync(passHash, salt)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.username.value,
          email: formData.email.value,
          type: "user",
          password: passHash2,
          salt: salt
        })
      };
      fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/register', requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if(data.status === "success"){
              setCurrentUser(data.data.user)
            } else if(data.message === "user already exists"){
                setAlreadyExistsErr(true)
            }
          });
    }
    }

  function toggle(){
    if(showPassword === "password"){
      setIsToggled(true)
      setShowPass("text")
    }else{
      setIsToggled(false)
      setShowPass("password")
    }
  } 
  return (
    <div className='auths'>
      <div className="authContainer">
        <h1>Registruotis</h1>
        <div className='errs'>
          {emailErr && <h5>El. Paštas turi buti ne ilgesnis nei 40 simbolių.</h5>}
          {passErr && <h5>Slaptažodis turi turėti nors vieną didžiają raidę ir turi būti ne ilgesnis nei 40 simbolių</h5>}
          {usernameErr && <h5>Vartotojo vardas turi būti nuo 3 iki 40 simbolių, gali susidaryti tik is raidžių ir skaičių</h5>}
          {alreadyExistsErr && <h5>Vartotojas su tokiu vardu arba el. paštu jau egzistuoja!</h5>}
        </div>
        <form onSubmit={(e)=>{register(e)}}> 
        <input type="text" name="username" id="regUsername" placeholder="Vartotojo Vardas" required></input>
        <input type="email" name="email" placeholder="El. Paštas" id="regEmail" required></input>
        <div className='registerPasswordField'>
          <input type={showPassword} id="regPass" placeholder="Slaptažodis" name="password" required>
          </input>
          <div className='registerShowPassword'>
            <FontAwesomeIcon className='eyeCon' onClick={()=>{toggle()}} icon={isToggled ? faEye : faEyeSlash} />
          </div>
        </div>
        <div className='submitBtns'>
        <input type="submit" value="Registruotis"></input>
        </div>
        </form>
        <div className="registerLinkLogin">Jau turite vartotojo paskyrą? <Link className='MainLink' to="/login">Prisijungti</Link></div>
      </div>
    </div>
  )
}

export default Register