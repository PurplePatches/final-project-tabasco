import React, { Component } from 'react'
import Map from './map'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first: false,
      last: false,
      dogname: false,
      dogbreed: false,
      bio: false
      
    }
  }
  render() {
    return (
      <>
      <div className='editProfile top'>
        <div className='left'>
          <div className='editprofilepic' onClick={this.props.handleClick}>
            <img src={this.props.profilePic} />
            <p>Change picture</p>
          </div>
        </div>
        <form className='right'>
            <p></p>
            <p className='saved'> {this.props.showSaved}</p>
              <p className='title'>First Name</p>
              {this.state.first 
              ? <input type='text' name='first' value={this.props.first} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => {this.props.saveData(e); this.setState({first: false})}}/>
              : <p onClick={() => this.setState({first: true})}>{this.props.first}</p>}
              
              <p className='title'>Last Name</p> 
              {this.state.last 
                ? <input type='text' name='last' value={this.props.last} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => {this.props.saveData(e); this.setState({last: false})}}/>
                : <p onClick={() => this.setState({last: true})}>{this.props.last}</p>}              
              <p className='title'>Dog's name</p>
              {this.state.dogname 
              ? <input type='text' name='dogname' value={this.props.dogname} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => {this.props.saveData(e); this.setState({dogname: false})}}/>
              : <p onClick={() => this.setState({dogname: true})}>{this.props.dogname}</p>}
              <p className='title'>Dog's breed</p> 
              {this.state.dogbreed 
                ? <input type='text' name='dogbreed' value={this.props.dogbreed} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => {this.props.saveData(e); this.setState({dogbreed: false})}}/>
                : <p onClick={() => this.setState({dogbreed: true})}>{this.props.dogbreed}</p>}              
              <p className='title'>Bio</p> 
              {this.state.bio 
              ? <input type='text' name='bio' value={this.props.bio} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => {this.props.saveData(e); this.setState({bio: false})}}/>
              : <p onClick={() => this.setState({bio: true})}>{this.props.bio}</p>}
              <p className='title'>Location</p> 
              <input type='text' name='location' value={this.props.location} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => this.props.saveData(e)}/>
              
            
          </form>
        
       
      </div>
      <div className='editProfile bottom'>
        <Map
          id="myMap"
          options={{
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8
          }}
          onMapLoad={map => {
            const parks = 	[
              { name: "Mauerpark",
                lat: 52.544937,
                lng: 13.402677
              },
              { name: "Grunewald",
                lat: 52.492069,
                lng: 13.284844
              }
            ]
            parks.forEach(park => {
              const marker = new window.google.maps.Marker({
                position: {lat: park.lat, lng: park.lng},
                map: map,
                title: park.name
              })
              marker.addListener('click', (e) => this.props.handleChange(e))
            })
          }}

        />
      </div>
      </>

    )
  }
}

