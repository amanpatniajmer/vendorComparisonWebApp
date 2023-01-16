import React from 'react'

const TableRow = ({dataArray=[], rowSpan=[]}) => {
  return (
    <tr>
        {dataArray.map((element, i) => <td key={element} rowSpan={rowSpan[i]}> {element} </td>)}
    </tr>
  )
}

export default TableRow