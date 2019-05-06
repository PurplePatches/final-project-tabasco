import React, { Component } from 'react'
import FriendButton from './friendbutton';
import { connect } from 'react-redux';
import { receiveRelations } from './utils/actions';

class Friends extends Component {
  componentDidMount() {
    this.props.dispatch(receiveRelations());
}


  render() {
    return (
      <div className='friend-list'>
        <div className='requests'>
          {this.props.friends ? this.props.friends[0] : 'nthigng'}
        </div>
        <div className='friends'>
        
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      relations: state.relations,
      profiles: state.profiles,
      images: state.images,
  };
};

export default connect(mapStateToProps)(Friends);