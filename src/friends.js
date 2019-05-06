import React, { Component } from 'react'
import { connect } from 'react-redux';
import { receiveRelations } from './utils/actions';
import Card from './card';



class Friends extends Component {
  componentDidMount() {
    this.props.dispatch(receiveRelations());
}


  render() {
    return (
      <>
      <div className='friend-list' id='requests'>
          
          {this.props.requests  && this.props.requests.length > 0
          ? this.props.requests.map(el => <Card key={el.relationid} id={el.requester === this.props.id ? el.requested : el.requester} image={this.props.images.find(image => el.requested === image.userid || el.requester === image.userid)} profile={this.props.profiles.find(profile => el.requested === profile.userid || el.requester === profile.userid)} />) 
          : 'No pending friend requests.'}
        </div>
        <div className='friends'>
          {this.props.friends && this.props.friends.length > 0
          ? this.props.friends.map(el => <Card key={el.relationid} id={el.requester === this.props.id ? el.requested : el.requester} image={this.props.images.find(image => el.requested === image.userid || el.requester === image.userid)} profile={this.props.profiles.find(profile => el.requested === profile.userid || el.requester === profile.userid)} />) 
          : <p>No friends.</p>}
        
      </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
      id: state.id,
      relations: state.relations,
      requests: state.requests,
      friends: state.friends,
      profiles: state.profiles,
      images: state.images,
  };
};

export default connect(mapStateToProps)(Friends);