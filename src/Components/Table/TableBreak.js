import React from 'react'

const TableBreak = ({breakText=""}) => {
  return (
    <tr className='tableBreakHeading'><td colSpan={10}>{breakText}</td></tr>
  )
}

export default TableBreak