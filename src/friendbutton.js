import React, { Component } from 'react'
import axios from './utils/axios'

export default class FriendButton extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.button = null
  }

  handleClick (e) {
    console.log(e.target.textContent);
    
  }  

  componentDidMount () {
    const id = this.props.id
    axios.get('/api/friendStatus/'+id).then(({data}) => {
      console.log(data);
      this.setState({...data})

    })
  }
  render() {
    const friendsButton = <div>unfriend</div>
    const noFriendRequest = <div>request friend</div>
    const canReject = <div>reject</div>
    const canRevoke = <div>revoke</div>
    
    if(this.state.canReject){
      this.button = 'reject'
    }else if(this.state.canReject === false){
      this.button = 'revoke'
    }else if(this.state.friends){
      this.button = 'unfriend'
    }else if (this.state.friends === false) {
      this.button = 'request friendship'
    }
    return (
      <div onClick={(e) => this.handleClick(e)}>
        {this.button}
      </div>
    )
  }
}
