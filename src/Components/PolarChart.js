import React from 'react'
import Header from './Header';
import { PolarArea } from 'react-chartjs-2'
import 'chart.js/auto'

const PolarChart = ({rawData={}, comparisons=[], heading = ""}) => {
    const data = {
        labels: comparisons,
        datasets: [{
          label: heading,
          data: comparisons.map((val)=>rawData[val]*100),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ]
        }]
      };

  return (
    <div className='radar-chart'>
        <Header heading='PolarAreaChart'/>
        <PolarArea data={data}/>
    </div>
  )
}

export default PolarChart