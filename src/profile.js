import React, { Component } from 'react'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    // this.registering = false
    // this.editProfile = this.editProfile.bind(this)
    // this.getProfile = this.getProfile.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  // updateProfile () {
  //   axios.post('/profile', {
  //     email: this.details.email,
  //     password: this.details.password,
  //   })
    //   .then(({data}) => {
    //     this.registering = false
    //     if(data.status === 'valid') {
    //       document.location.replace('/')
    //     }else{
    //       this.setState({error: true})
    //     }
    //     this.registering = false
    //   })
    //   .catch(err => {
    //     this.registering = false
    //     this.setState({error: true})
    //     console.log(err);
    //   })
  



  render() {
    return (
      <div className='editProfile'>
        <div className='left'>
          <div className='editprofilepic' onClick={this.props.handleClick}>
            <img src={this.props.profilePic} />
            <p>Change picture</p>
          </div>
        </div>
        <div className='right'>
          <form>
            <p className='saved'>saved</p>
            <div className='form-line'>
              <p>First Name</p>
              <input type='text' name='first' value={this.props.first} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => this.props.saveData(e)}/>
            </div>  
            <div className='form-line'>
              <p>Last Name</p> 
              <input type='text' name='last' value={this.props.last} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => this.props.saveData(e)}/>
            </div>
            <div className='form-line'>
              <p>Dog's name</p> 
              <input type='text' name='dogname' value={this.props.dogname} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => this.props.saveData(e)}/>
            </div>
            <div className='form-line'>
              <p>Dog's breed</p> 
              <input type='text' name='dogbreed' value={this.props.dogbreed} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => this.props.saveData(e)}/>
            </div>
            <div className='form-line'>
              <p>Bio</p> 
              <input type='text' name='bio' value={this.props.bio} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => this.props.saveData(e)}/>
            </div>
            <div className='form-line'>
              <p>Location</p> 
              <input type='text' name='location' value={this.props.location} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => this.props.saveData(e)}/>
              
            </div>
          </form>
        </div>
      </div>

    )
  }
}

