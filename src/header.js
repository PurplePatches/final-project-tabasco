import React from 'react' 
import Logout from './logout';
import { Link} from 'react-router-dom'



export default function Header(props) {
  return (
    <header>
      
      <div id='header-items'>
    
        <Link to='/profile' className='header-item'>PROFILE</Link>
        <div className='header-item'>FIND FRIENDS</div>
      </div>
     <div className='header-profile outer'>
        <div className='header-profile header-item'>
          {props.dogname.toUpperCase()}
        </div>
        <img className='header-profile' src={props.profilePic} />
        <div className='profilepic header-profile'>
          
        </div>
      </div>
    </header>
  )
}
