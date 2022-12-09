import React from 'react'

const TableHeader = ({headings=[]}) => {
  return (
    <thead>
        <tr>
            {headings.map((heading)=><th key={heading}>{heading}</th>)}
        </tr>
    </thead>
  )
}

export default TableHeader