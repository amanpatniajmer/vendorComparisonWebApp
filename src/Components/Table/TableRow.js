import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import ChangingProgressProvider from '../ChangingProgressProvider'

const TableRow = ({rowSpan=[], mode=0, dataObject = {}, headingsArray=[]}) => {

  function getClassName(mode, value) {
    let className = ''
    if (mode === 3 && (value ==="Y" || value === "N")) className = `e-${value} center`;
    else if (mode === 2 && !isNaN(value)) className = `e-${value} center`
    if (mode === 3 && dataObject["S.No"]%1 === 0) className += ' tableBreak';
    return className;
  }


  return (
    <tr>
        {/* {dataArray.map((element, i) => {
          if (mode === 1 && !isNaN(element))
            return <td key={i} rowSpan={rowSpan[i]}>
              <div className='pie'>
              <ChangingProgressProvider values={[0, element]}>
                {percentage => (
                <CircularProgressbar value={percentage} strokeWidth={50}
                  styles={buildStyles({
                    pathColor: "rgb(117, 9, 171)",
                    trailColor: "rgb(200, 200, 200)",
                    pathTransitionDuration: 0.7
                  })}
                  />
                )}
              </ChangingProgressProvider>
          </div>
               </td>
          else
            return <td key={i} rowSpan={rowSpan[i]} className={getClassName(mode, element)}> {element} </td>
        })} */}

        {headingsArray.map((heading, i) => {
          let value = dataObject[heading]
          if (mode === 1 && !isNaN(value))
            return <td key={i} rowSpan={rowSpan[i]}>
              <div className='pie'>
              <ChangingProgressProvider values={[0, value]}>
                {percentage => (
                <CircularProgressbar value={percentage} strokeWidth={50}
                  styles={buildStyles({
                    pathColor: "rgb(117, 9, 171)",
                    trailColor: "rgb(200, 200, 200)",
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
            return <td key={i} rowSpan={rowSpan[i]} className={getClassName(mode, value)}> {value} </td>
        })}
    </tr>
  )
}

export default TableRow