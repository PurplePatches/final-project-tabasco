import React from 'react' 
import Logout from './logout';

export default function Header(props) {
  return (
    <header>
      
      <div id='header-items'>
        <div className='profilepic'>
          <img src='./uploads/doglogo.jpg' />
        </div>
        <div className='header-item' id='header-profile'>PROFILE</div>
        <div className='header-item' id='header-profile'>FIND FRIENDS</div>
      </div>
     <div className='profile'>
        <div className='header-item'>
          {props.dogname.toUpperCase()}
        </div>
        <div className='profilepic'>
          <img src={props.profilePic || './uploads/dogprofile.jpg'} />
        </div>
      </div>
    </header>
  )
}
