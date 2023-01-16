import React from 'react'
import TableBreak from './TableBreak'
import TableRow from './TableRow'

const TablePartiton = ({dataObject, breakText, firstRowSpan=false}) => {
  return (
    <>
        {breakText && <TableBreak breakText = {breakText}/>}
        {!firstRowSpan ? 
        Object.entries(dataObject).map(([key]) => 
            <TableRow key={key} dataArray={[key, ...dataObject[key]]}/> 
        ) :
        Object.entries(dataObject).map((val, i)=>{
            let length = Object.keys(dataObject).length;
            if (i == 0) return <TableRow key={i} dataArray={[breakText, val[0], ...val[1]]} rowSpan={[length]}/>
            else return <TableRow key={i} dataArray={[val[0], ...val[1]]}/>
        })}
    </>
  )
}

export default TablePartiton