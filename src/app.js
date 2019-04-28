import React, { Component } from 'react'
import Header from './header';
import Home from './home'
import Profile from './profile'
import axios from './utils/axios'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        first: '',
        last: '',
        bio: '',
        dogname: '',
        dogbreed: '',
        location: '',
        profilePic: '',
    }
    this.dbProfile = {}
  }

  componentDidMount () {
    axios.get('/profile').then(({data}) => {
      this.setState({...data})
      this.dbProfile = {...data}
    })

  }

  handleChange(e){
    if(e.target.name === 'picture'){
  
        const formToSubmit = new FormData();    
        formToSubmit.append('file', document.getElementById('pic-select').files[0])
        axios.post('/picture', formToSubmit)
          .then(({data}) => this.setState({profilePic: data.url}))
          .catch(err => console.log(err))
      
 
    }else{
      this.setState({[e.target.name]: e.target.value});
    }
  }

  saveData (e) {
      if (
        this.dbProfile.first != this.state.first ||
        this.dbProfile.last != this.state.last || 
        this.dbProfile.dogname != this.state.dogname ||
        this.dbProfile.dogbreed != this.state.dogbreed ||
        this.dbProfile.bio != this.state.bio ||
        this.dbProfile.location != this.state.location
      ) {
        axios.post('/profile', {data: this.state})
          .then((data) => {
            console.log('profile update statuscode', data.status);
            this.dbProfile = {...this.state}
          })
          .catch(err => console.log(err))
      }
  }

  changePhoto () {
    document.getElementById('pic-select').click()
  }

  render() {
    return (
      <>
        <Header profilePic={this.state.profilePic}/>
        <Home />
        <Profile 
          first={this.state.first}
          last={this.state.last} 
          dogname={this.state.dogname} 
          dogbreed={this.state.dogbreed} 
          bio={this.state.bio}
          location={this.state.location}
          profilePic={this.state.profilePic}
          handleChange={(e) => this.handleChange(e)} 
          saveData={e => this.saveData(e)}
          handleClick={() => this.changePhoto()}
        />
      <input onChange={(e) => this.handleChange(e)} type="file" name="picture" id='pic-select' style={{display: 'none'}} autoComplete="off" />
      </>
    )
  }
}
