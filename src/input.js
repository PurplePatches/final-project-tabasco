import React from 'react'

export default function Input({name, title, isInput, value, onChange, blur, onClick, onTab, next}) {
  const handleKeyDown = (e) => {
    if(e.key === 'Tab') {
      e.preventDefault()
      blur()
      onTab(next)
    }
  }
  return (
    <>
      <p className='title'>{title}</p>
      {isInput 
      ? <input type='text' name={name} value={value} onKeyDown={handleKeyDown} onChange={(e) => onChange(e)} onBlur={() => blur()}/>
      : <p onClick={(e) => onClick(e)}>{value}</p>}
    </>
  )
}
