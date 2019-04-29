import React from 'react' 
import Logout from './logout';

export default function Header(props) {
  return (
    <header>
      
      <div id='header-items'>

        <div className='header-item'>PROFILE</div>
        <div className='header-item'>FIND FRIENDS</div>
      </div>
     <div className='header-profile outer'>
        <div className='header-profile header-item'>
          {props.dogname.toUpperCase()}
        </div>
        <div className='profilepic header-profile'>
          <img className='header-profile' src={props.profilePic || './uploads/dogprofile.jpg'} />
        </div>
      </div>
    </header>
  )
}
