import React, { Component } from 'react'
import Header from './header';
import Home from './home'
import Profile from './profile'
import axios from './utils/axios'
import Dropdown from './dropdown';

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
        showSaved: " ",
    }
    this.dbProfile = {}
  }

  componentDidMount () {
    axios.get('/profile').then(({data}) => {
      this.setState({...data})
      this.dbProfile = {...data}
    })
    document.addEventListener('mousemove', (e) => {
      const dropdown = document.getElementById('dropdown')
      if(!dropdown.classList.contains('show') && e.target.classList.contains('header-profile')){
        dropdown.classList.add('show')
      }else if(dropdown.classList.contains('show') && !e.target.classList.contains('header-profile')){
        dropdown.classList.remove('show')
      }

    })
  }

  handleChange(e){
    if(e.wa){
      this.setState({location: e.wa.target.title});
      this.saveData()
    }else if(e.target.name === 'picture'){
  
        const formToSubmit = new FormData();    
        formToSubmit.append('file', document.getElementById('pic-select').files[0])
        axios.post('/picture', formToSubmit)
          .then(({data}) => this.setState({profilePic: data.url}))
          .catch(err => console.log(err))
      
 
    }else{
      this.setState({[e.target.name]: e.target.value});
    }
  }

  saveData () {
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
            this.setState({showSaved: 'saved'})
            setTimeout(() => this.setState({showSaved: ' '}), 2000)
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
        <Header profilePic={this.state.profilePic} dogname={this.state.dogname} />
        <Dropdown />
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
          showSaved={this.state.showSaved}
        />
      <input onChange={(e) => this.handleChange(e)} type="file" name="picture" id='pic-select' style={{display: 'none'}} autoComplete="off" />
      </>
    )
  }
}
