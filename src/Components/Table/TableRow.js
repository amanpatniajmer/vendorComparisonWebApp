import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import ChangingProgressProvider from '../ChangingProgressProvider'

const TableRow = ({dataArray=[], rowSpan=[], mode=0}) => {


  return (
    <tr>
        {dataArray.map((element, i) => {
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
          else if(mode === 2 && !isNaN(element))
            return <td key={i} rowSpan={rowSpan[i]} className={`e-${element}`}> {element} </td>
          else if(mode === 3 && (element==="Y" || element === "N"))
            return <td key={i} rowSpan={rowSpan[i]} className={`e-${element}`}> {element} </td>
          else 
            return <td key={i} rowSpan={rowSpan[i]}> {element} </td>

        })}
    </tr>
  )
}

export default TableRow