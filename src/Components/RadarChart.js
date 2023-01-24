import React, { useState } from 'react'
import Header from './Header'
import {Radar} from 'react-chartjs-2'
import 'chart.js/auto'

const RadarChart = ({rawData=[], comparisons=[]}) => {

    function getComparisons() {
        
    }
    let styles = [{backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'},
                    {
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                    }
                ]
      let data = {
        labels: rawData.map((val,i)=>val['Capability']),
        
        datasets: comparisons.map((val,i)=>{
            return {
                label: val,
                data: rawData.map((row)=>row[val]),
                fill: true,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                ...styles[i]
            }
        })
      };

      const config = {
        type: 'radar',
        data: data,
        options: {
          elements: {
            line: {
              borderWidth: 3
            }
          }
        },
      };
  return (
    <div className='radar-chart'>
        <Header heading='RadarChart'/>
        <Radar data={data} options={config["options"]}/>
    </div>
  )
}

export default RadarChart