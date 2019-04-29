import React, {useState} from 'react'
import axios from './utils/axios'

export default function Settings(props) {
  const [passwords, setPasswords] = useState({password1: '', password2: ''})

  const updateEmailPassword = e => {
    e.preventDefault()
    const data = {
      password: passwords.password1,
      email: props.email
    }
    axios.post('/passwordemail', data)
    .then((data) => {
      props.exitSettings()
    })
    .catch(err => console.log(err))
  }
  

  let submitDisabled = true
  if(props.email.length > 5 && passwords.password1 === '' && passwords.password2 === ''){
    submitDisabled = false
  }else if(props.email.length > 5  && passwords.password1.length > 5 && passwords.password1 === passwords.password2){
    submitDisabled = false
  }

  return (

    <div id='settings'>
      <h2>Edit Email or Password</h2>
      <form onSubmit={updateEmailPassword}>
        <div className='form-line'>
          <p>Email</p>
          <input type='text' name='email' value={props.email} onChange={(e) => props.handleChange(e)}/>
        </div>  
        <div className='form-line'>
        <div style={{display: 'flex'}}> <p>Password (min. 6 characters)</p></div> 
          <input type='password' name='password1' value={passwords.password1} onChange={(e) => setPasswords({...passwords, password1: e.target.value})} />
        </div>
        <div className='form-line'>
          <p>Re-type password</p> 
          <input type='password' name='password2' value={passwords.password2} onChange={(e) => setPasswords({...passwords, password2: e.target.value})} />
        </div>
        <div className='submit'>
          <input type='submit' name='submit' value='Submit' disabled={submitDisabled} onSubmit={updateEmailPassword}/>
        </div>

      </form>
    </div>
  )
}
