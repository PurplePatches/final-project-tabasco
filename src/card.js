import React from 'react'
import FriendButton from './friendbutton';
import { Link} from 'react-router-dom'


export default function Card({image, profile, id}) {

  const clickHandler = (e) => console.log(e);
  

  return (
    <div className='card' onClick={clickHandler}>
      <Link to={'/profile/'+id}><img src={image.url}></img>
      <div className='title'>{profile.dogname}</div></Link>
      <div className='action'><FriendButton id={id}/></div>
    </div>
  )
}
