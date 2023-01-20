import React from 'react'

const Header = ({heading="Table", className=""}) => {
  return (
    <h1 className={className + " header"}>{heading}</h1>
  )
}

export default Header


