// import React from 'react'
// import axios from 'axios';


// export default function Login(props) {
//   let loggingIn = false
//   const details = {}
//   const login = e => {
//     if (loggingIn) {
//       console.log('Logging in in-progress, please wait');
//     }
//     loggingIn = true
//     axios.post('/login', {
//       email: details.email,
//       password: details.password,
//     })
//       .then(data => {
//         console.log(data);
//         loggingIn = false
//         if(data.status === 200) {
//           document.location.replace('/')
//         }else{
//           console.log('something went wrong');
//         }
//       })
//       .catch(err => {
//         loggingIn = false
//         console.log(err);
//       })
    
//   }
//   return (
//     <>
//       <h1>Log in</h1>
//       <div className='form'>
//         <div className='error hidden'>something went wrong</div>
//         <div className='form-line'>
//           <p>Email</p> <input type='email' name='email' onChange={e => details[e.target.name] = e.target.value}/>
//         </div>
//         <div className='form-line'>
//           <p>Password</p> <input type='password' name='password' onChange={e => details[e.target.name] = e.target.value}/>
//         </div>
//       {/* <input type="hidden" name="_csrf" value="{csrfToken}" /> */}
//       <input type='submit' onClick={submit} value='Log in'/>
//     </div>
//     <div>
//       <p style={{textAlign: 'center'}}>No account yet? <a onClick={props.switchScreen}>Register here for free!</a></p>
//     </div>
//   </>
//   )
// }

import React, { Component } from 'react'
import axios from './utils/axios';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
    this.details = {}
    this.loggingin = false
    this.login = this.login.bind(this)
  }

    login () {
      e.preventDefault()
      if (this.loggingIn) {
        return console.log('Logging in in-progress, please wait');
      }
      this.loggingIn = true
      console.log(this.details);
      axios.post('/login', {      
        email: this.details.email,
        password: this.details.password,
      })
        .then(({data}) => {
          this.loggingIn = false
          if(data.status === 'valid') {
            document.location.replace('/')
          }else{
            this.setState({error: true})
          }
          this.loggingIn = false
        })
        .catch(err => {
          this.loggingIn = false
          this.setState({error: true})
          console.log(err);
        })
    }

  render() {
    return (
      <>
      <h1>Log in</h1>
      <form>
        <div className={this.state.error ? 'error' : 'error hidden'}>something went wrong</div>
        <div className='form-line'>
          <p>Email</p> <input type='email' name='email' onChange={e => this.details[e.target.name] = e.target.value}/>
        </div>
        <div className='form-line'>
          <p>Password</p> <input type='password' name='password' onChange={e => this.details[e.target.name] = e.target.value}/>
        </div>
      <input type='submit' onClick={e => this.login(e)} value='Log in'/>
    </form>
    <div>
      <p style={{textAlign: 'center'}}>No account yet? <Link to='/'>Register here for free!</Link></p>
    </div>
  </>
    )
  }
}

