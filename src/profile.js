import React, { Component } from 'react'
import Map from './map'
import Input from './input';
import WideImage from './wideimage';
import Cover from './cover';


export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first: false,
      last: false,
      dogname: false,
      dogbreed: false,
      bio: false,
      imageModal: false,
      imageModalStart: 0,
    }
    this.profileItems = [{
      name: 'first',
      title: 'First Name'
    },{
      name: 'last',
      title: 'Last Name'
    },{
      name: 'dogname',
      title: "Dog's Name"
    },{
      name: 'dogbreed',
      title: "Dog's Breed"
    },{
      name: 'bio',
      title: 'Bio'
    },
  ]
  }

  componentDidUpdate(){
    document.getElementsByTagName('input')[0].focus()
  }

  selectNextItem(next){
    if(next){
      this.setState({[next.name]: true})
    }
  }

  handleClick(e){
    this.setState({imageModal: true})
    console.log(e);
    console.log(e.target.id);
  }

  render() {
    const mappedProfile = this.profileItems
      .map((el,index,arr) => (
        <Input 
          key={index}
          next={arr[index+1]}
          onTab={(next) => this.selectNextItem(next)} 
          name={el.name}
          onClick={() => this.setState({[el.name]: true})} 
          isInput={this.state[el.name] } 
          title={el.title} 
          value={this.props[el.name]} 
          onChange={(e) => this.props.handleChange(e)} 
          blur={() => {this.setState({[el.name]: false});this.props.saveData()}}/>
        ))
    const previewImages = this.props.images
        .map((el, index) => (
          <img id={index} className='preview' key={index} src={el.url}  onClick={(e) => this.handleClick(e)}/>
        ))
    return (
      <>
      {this.state.imageModal && this.props.images.length > 0 &&
        <>
          <Cover coverClicked={() => this.setState({imageModal: false})}/>
          <WideImage 
            start={this.state.imageModalStart}
            profileimage={0}
            images={this.props.images}
            clickHandler={(e) => this.props.handleClick(e)}
          />
        </>}
      <div className='profile top'>
        <div className='left'>
          <div className='profilepic'>
            <img id='main' src={this.props.images.length > 0 ? this.props.images[0].url : './uploads/dogprofile.jpg'}  onClick={(e) => this.handleClick(e)}/>
            <p>Change picture</p>
            <div className='preview-images'>
              {previewImages}
            </div>
            <div className='button'>UPLOAD</div>
          </div>
        </div>
        <form className='right'>
            <p></p>
            <p className='saved'> {this.props.showSaved}</p>
              {mappedProfile}
              <p className='title'>Location</p> 
              <input type='text' name='location' value={this.props.location} onChange={(e) => this.props.handleChange(e)} onBlur={(e) => this.props.saveData(e)}/>
              
            
          </form>
        
       
      </div>
      <div className='profile bottom'>
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

