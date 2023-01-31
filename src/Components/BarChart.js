import React from 'react'
import 'chart.js/auto'
import {Bar} from 'react-chartjs-2'
import Header from './Header'
import {colors} from '../Data/colors'

const BarChart = ({rawData=[], comparisons = []}) => {
    let config ={}
    config["options"] = {}

    const data = {
        labels: comparisons,
        datasets: rawData.map((row, i)=>{
          let length = colors.length
            return {
                  label: row['Capability'],
                  backgroundColor: colors[i % length],
                  borderColor: colors[i % length],
                  data: comparisons.map((val)=>row[val])
                }
        })
      };

  return (
    <div className='bar-chart'>
        <Header heading='BarChart'/>
        <Bar data={data}/>
    </div>
  )
}

export default BarChart