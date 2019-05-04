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
    const id = this.props.id
    axios.post('/api/friendStatus/'+id,{action: e.target.innerText}).then(({data}) => {
      console.log(data);
      this.setState({...data})

    })    
  }  

  componentDidMount () {
    const id = this.props.id
    axios.get('/api/friendStatus/'+id).then(({data}) => {
      console.log(data);
      this.setState({...data})

    })
  }
  render() {
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
      <div className='friend-button' onClick={(e) => this.handleClick(e)}>
        {this.button}
      </div>
    )
  }
}
