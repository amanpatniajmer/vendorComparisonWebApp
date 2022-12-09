import React from 'react'

const TableRow = ({dataArray=[]}) => {
  return (
    <tr>
        {dataArray.map((element) => <td key={element}> {element} </td>)}
    </tr>
  )
}

export default TableRow