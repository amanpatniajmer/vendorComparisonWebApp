import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import ChangingProgressProvider from '../ChangingProgressProvider'

const TableRow = ({dataArray=[], rowSpan=[], mode=0}) => {
  return (
    <tr>
        {dataArray.map((element, i) => {
          if (mode === 1 && !isNaN(element))
            return <td key={element} rowSpan={rowSpan[i]}>
              <div className='pie'>
              <ChangingProgressProvider values={[0, element]}>
                {percentage => (
                <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={50}
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: "turquoise",
                    trailColor: "grey",
                    pathTransitionDuration: 0.7
                  })}
                  />
                )}
              </ChangingProgressProvider>
          </div>
               </td>
          else
            return <td key={element} rowSpan={rowSpan[i]}> {element} </td>

        })}
    </tr>
  )
}

export default TableRow