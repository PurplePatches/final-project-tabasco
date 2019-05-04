import React from 'react'
import axios from './utils/axios'

export default function Dropdown(props) {
  const logOut = () => {
    axios.post('/api/logout').then(() => {
      location.reload()
    })
  }

  return (
    <div id='dropdown' className='header-profile'>
      <div id='dropdown-settings' className='header-profile' onClick={props.clickHandler}>Settings</div>
      <div id='dropdown-logout' className='header-profile' onClick={logOut}>Logout</div>
    </div>
  )
}
