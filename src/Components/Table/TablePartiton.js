import React from 'react'
import TableBreak from './TableBreak'
import TableRow from './TableRow'

const TablePartiton = ({dataArray, breakText}) => {
  return (
    <>
        <TableBreak breakText = {breakText}/>
        {Object.entries(dataArray).map(([key]) => <TableRow key={key} dataArray={[key, ...dataArray[key]]}/> )}
    </>
  )
}

export default TablePartiton