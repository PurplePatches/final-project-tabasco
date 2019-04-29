import React from 'react'

export default function Dropdown(props) {
  return (
    <div id='dropdown' className='header-profile'>
      <p id='dropdown-settings' className='header-profile' onClick={props.clickHandler}>Settings</p>
      <p id='dropdown-logout' className='header-profile' onClick={props.clickHandler}>Logout</p>
    </div>
  )
}
