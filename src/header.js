import React from 'react' 
import Logout from './logout';

export default function Header(props) {
  return (
    <header>
      
      <div id='header-items'>
      LOGO
        <div className='header-item' id='header-profile'>PROFILE</div>
        <div className='header-item' id='header-profile'>FIND FRIENDS</div>
      </div>
     <div className='profile'>
        <div className='username'>
          Username
        </div>
        <div className='profilepic'>
          <img src={props.profilePic || './uploads/dogprofile.jpg'} />
        </div>
      </div>
    </header>
  )
}
