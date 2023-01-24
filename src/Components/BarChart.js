import React from 'react'
import 'chart.js/auto'
import {Bar} from 'react-chartjs-2'
import Header from './Header'

const BarChart = ({rawData=[], comparisons = []}) => {
    let config ={}
    config["options"] = {}

    const data = {
        labels: comparisons,
        datasets: rawData.map((row)=>{
            return {
                  label: row['Capability'],
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: "rgb(255, 99, 132)",
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