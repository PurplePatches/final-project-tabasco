import React, { Component } from 'react'
import { BrowserRouter, Route, Link} from 'react-router-dom'

import Header from './header';
import Home from './home'
import Profile from './profile'
import axios from './utils/axios'
import Dropdown from './dropdown';
import Settings from './settings';
import Cover from './cover';
import BrowseProfile from './browseprofile'
import Friends from './friends'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        first: '',
        email: '',
        last: '',
        bio: '',
        dogname: '',
        dogbreed: '',
        location: '',
        images: [],
        showSaved: " ",
        showSettingsModal: false,
    }
    this.dbProfile = {}
  }

  componentDidMount () {
    this.getProfile()
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
          .then(() => this.getProfile())
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

  clickHandler (e) {
    if(e.target.id === 'dropdown-settings'){
      this.setState({showSettingsModal: true})
    }else if(e.target.id === 'coverdiv'){
      this.setState({showSettingsModal: false})
    }else if(e.target.id === 'upload'){
      document.getElementById('pic-select').click()
    }else if(e.target.id === 'make-profile'){
      const imageid = e.target.parentElement.parentElement.id
      axios.post('/api/setProfilePicture/'+imageid).then(console.log)
    }else if(e.target.id === 'delete'){
      const imageid = e.target.parentElement.parentElement.id
      axios.post('/api/deletePicture/'+imageid).then(console.log)
    }else if(e.target.id === 'description'){
      console.log(e);
      console.log(e.target.parentElement.parentElement.id);
    }else{
      console.log(e);
      console.log(e.target.parentElement.parentElement.id);
      
      
    }
  }

  getProfile(){
    axios.get('/api/profile/me').then(({data}) => {
      this.setState({...data})
      this.dbProfile = {...data}
    })
  }

  render() {
    return (
      <BrowserRouter>
      <>
        {this.state.showSettingsModal ? <Cover coverClicked={e => this.clickHandler(e)}/> : null}
        <Header profilePic={this.state.images.length > 0 ? this.state.images[0].url : './uploads/dogprofile.jpg'} dogname={this.state.dogname} />
        <Dropdown clickHandler={e => this.clickHandler(e)}/>
          {this.state.showSettingsModal ? <Settings exitSettings={() => this.setState({showSettingsModal: false})} email={this.state.email} handleChange={e => this.handleChange(e)}/> : null}
        <Route exact path='/' component={Home} />
        <Route exact path='/friends' component={Friends} />
        <Route exact path='/profile' render={() => (
          <>
            <Profile 
              first={this.state.first}
              last={this.state.last} 
              dogname={this.state.dogname} 
              dogbreed={this.state.dogbreed} 
              bio={this.state.bio}
              location={this.state.location}
              images={this.state.images}
              handleChange={(e) => this.handleChange(e)} 
              saveData={e => this.saveData(e)}
              handleClick={(e) => this.clickHandler(e)}
              showSaved={this.state.showSaved}
              getProfile={() => this.getProfile()}
            />
            <input onChange={(e) => this.handleChange(e)} type="file" name="picture" id='pic-select' style={{display: 'none'}} autoComplete="off" />
          </>
        )} />
        <Route 
          path='/profile/:id' 
          render={props => (
            <BrowseProfile
              key={props.match.url}
              match={props.match}
              history={props.history}
            />
          )} 
        />

      
      </>
      </BrowserRouter>
    )
  }
}
