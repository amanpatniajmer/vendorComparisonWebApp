import React from 'react'
import Header from './Header';
import { PolarArea } from 'react-chartjs-2'
import 'chart.js/auto'
import {colors} from '../Data/colors'

const PolarChart = ({rawData={}, comparisons=[], heading = ""}) => {
    const data = {
        labels: comparisons,
        datasets: [{
          label: heading,
          data: comparisons.map((val)=>rawData[val]*100),
          backgroundColor: colors
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