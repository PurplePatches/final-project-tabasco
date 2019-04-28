import React, { Component } from 'react'
import axios from './utils/axios';
import { Link } from 'react-router-dom';

export default class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
    this.details = {}
    this.registering = false
    this.submitReg = this.submitReg.bind(this)
  }

    submitReg (e) {
      e.preventDefault()
      if (this.registering) {
        console.log('regestering already in process, please wait');
      }  
      if (!this.details.email || !this.details.password){
        this.setState({error: true})
        return console.log('cant do this mate');
      }
      this.registering = true
      axios.post('/register', {
        email: this.details.email,
        password: this.details.password,
      })
        .then(({data}) => {
          this.registering = false
          if(data.status === 'valid') {
            document.location.replace('/')
          }else{
            this.setState({error: true})
          }
          this.registering = false
        })
        .catch(err => {
          this.registering = false
          this.setState({error: true})
          console.log(err);
        })
  }

  render() {
    return (
      <>
        <h1>Register now!</h1>
        <form>
          <div className={this.state.error ? 'error' : 'error hidden'}>something went wrong</div>
          <div className='form-line'>
            <p>Email</p> <input type='email' name='email' onChange={e => this.details[e.target.name] = e.target.value}/>
          </div>
          <div className='form-line'>
            <p>Password</p> <input type='password' name='password' onChange={e => this.details[e.target.name] = e.target.value}/>
          </div>
        <input type='submit' onClick={e => this.submitReg(e)} value='Register'/>
        </form>
        <div>
          <p style={{textAlign: 'center'}}>Already registered? <Link to='/login'>Click here to login.</Link></p>
        </div>
      </>
    )
  }
}

