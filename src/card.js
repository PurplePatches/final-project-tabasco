import React from 'react'
import FriendButton from './friendbutton';

export default function Card({image, profile, id}) {
  return (
    <div className='card'>
      <img src={image.url}></img>
      <div className='title'>{profile.dogname}</div>
      <div className='action'><FriendButton id={id}/></div>
    </div>
  )
}
