import React, {useState} from 'react'
import bcrypt from 'bcryptjs'

const Login = () => {
    let [loggedUser, setLoggedUser] = useState()
    let [loginErrs, setLoginErrs] = useState(false)



    function login(e){
        setLoginErrs(false)
        e.preventDefault();
        let formData = e.target;
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: formData.username.value
          })
        };
        fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.status === "Success"){
            const passHash = bcrypt.hashSync(formData.password.value, data.user.salt)
            const passHash2 = bcrypt.hashSync(passHash, data.user.salt)
            if(passHash2 === data.user.password){
              setLoggedUser(data.user)
            }else{
              setLoginErrs(true)
            }
          }
        });
      }



  return (
    <div className="container">
        <div className='errs'>
            {loginErrs && <h5>Vartotojo vardas arba slaptažodis neteisingi</h5>}
        </div>
    {loggedUser && <h1>Prisijunges vartotojas :{loggedUser.name}</h1>}
    <form onSubmit={(e)=>{login(e)}}>
      <input type="text" name="username" required id="loginId" placeholder='Vartotojo vardas'>
      </input>
      <input type="password" name="password" required id="loginPass" placeholder='Slaptažodis'>
      </input>
      <input type="submit" id="loginSubmit" value="Login"></input>
    </form>
    </div>
  )
}

export default Login