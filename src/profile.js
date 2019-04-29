import React, { Component } from 'react'
import Map from './map'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
        <div className='right'>
          <form>
            <p className='saved'> {this.props.showSaved}</p>
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

