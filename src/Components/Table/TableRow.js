import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import ChangingProgressProvider from '../ChangingProgressProvider'

const TableRow = ({rowSpan=[], mode=0, dataObject = {}, headingsArray=[]}) => {

  function getClassName(mode, value, heading) {
    let className = ''
    if (mode === 3 && (value ==="Y" || value === "N")) className = `e-${value}`;
    else if (mode === 2 && !isNaN(value)) className = `e-${value}`
    if (heading !== headingsArray[0] && heading !== headingsArray[1]) className += ' center';
    if (mode === 3 && dataObject["S.No"]%1 === 0) className += ' tableBreak';
    return className;
  }


  return (
    <tr>
        {headingsArray.map((heading, i) => {
          let value = dataObject[heading]
          if (mode === 1 && !isNaN(value))
            return <td key={i} rowSpan={rowSpan[i]}>
              <div className='pie'>
              <ChangingProgressProvider values={[0, value]}>
                {percentage => (
                <CircularProgressbar value={percentage} strokeWidth={50}
                  styles={buildStyles({
                    pathColor: "rgb(126,1,255)",
                    pathTransitionDuration: 0.7
                  })}
                  />
                )}
              </ChangingProgressProvider>
          </div>
               </td>
          else if (mode === 2 && heading === 'Capability' && value === '')
            return ''
          else
            return <td key={i} rowSpan={rowSpan[i]} className={getClassName(mode, value, heading)}> {value} </td>
        })}
    </tr>
  )
}

export default TableRow