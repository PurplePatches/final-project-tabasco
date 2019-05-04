import React, { Component } from 'react'
import axios from './utils/axios'
import Map from './map'
import FriendButton from './friendbutton';

export default class BrowseProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMap: false,
      images: [],
    }
  }
  componentDidMount () {
    const id = this.props.match.params.id
    axios.get('/api/profile/'+id).then(({data}) => {
      // console.log(data);
      
      this.setState({...data})
    })
  }

  render() {
    return (
      <div id='browse-profile'>
        <img className='image' src={this.state.images.length > 0 ? this.state.images[0].url : './uploads/dogprofile.jpg'} />
        {this.state.showMap &&
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
 
         />}
        <div className='profile top other-profile'>
          <div className='left'>
            <img src={this.state.profilePic} />
            <FriendButton id={this.props.match.params.id}/>
          </div>
          <div className='right'>
            <p className='title'>Dog Name:</p>
            <p>{this.state.dogname}</p>
            <p className='title'>Dog Breed:</p>
            <p>{this.state.dogbreed}</p>
            <p className='title'>Name owner:</p>
            <p>{this.state.first}</p>

            <p className='title'>Bio:</p>
            <p>{this.state.bio}</p>
            <p className='title'>Go-to park:</p>
            <p>{this.state.location}</p>
          </div>
        </div>
        <div className='bottom'>
        below
          </div>
      </div>
    )
  }
}
