import React, {useState, useEffect} from 'react'
import bcrypt from 'bcryptjs'
import './Register.css';

const validUsername = new RegExp(
    '^[a-zA-Z0-9].{3,40}$'
  )
  
  const validEmail = new RegExp(
    '^[a-zA-Z0-9].{3,40}$'
  )
  const validPassword = new RegExp(
    '^[a-zA-Z0-9](?=.*[A-Z]).{3,40}$'
  )

const Register = () => {
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
          type: "admin",
          password: passHash2,
          salt: salt
        })
      };
      fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/register', requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if(data.status === "success"){
              setLoggedUser(data.data.user._id)
            } else if(data.message === "user already exists"){
                setAlreadyExistsErr(true)
            }
          });
    }
    }

  function toggle(){
    if(showPassword === "password"){
      setShowPass("text")
    }else{
      setShowPass("password")
    }
  } 
  return (
    <div className="container">
      <div className='errs'>
        {emailErr && <h5>Email must be valid and have no more than 40 characters</h5>}
        {passErr && <h5>Password must have atleast one uppercase letter and must be between 3 and 40 characters</h5>}
        {usernameErr && <h5>Username must be between 3 and 40 characters long</h5>}
        {alreadyExistsErr && <h5>User already exists!</h5>}
      </div>
      <form onSubmit={(e)=>{register(e)}}> 
      <input type="text" name="username" id="regUsername" placeholder="Username" required></input>
      <input type="text" name="email" placeholder="Email" id="regEmail" required></input>
      <input type={showPassword} id="regPass" placeholder="Password" name="password" required>
      </input>
      <input type="checkbox" id="regShowPass" name="showPass" onClick={()=>{toggle()}}></input><label htmlFor="showPass">Rodyti slaptažodi</label>
      <input type="submit" value="register"></input>
      </form>
    </div>
  )
}

export default Register