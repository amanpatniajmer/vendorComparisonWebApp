import React from 'react'
import Header from './Header'
import {Radar} from 'react-chartjs-2'
import 'chart.js/auto'
import {colors} from '../Data/colors'

const RadarChart = ({rawData=[], comparisons=[]}) => {
    function convertRGBtoRGBA(rgb='',opacity) {
        let rgba = rgb.slice(0,3) + "a" + rgb.slice(3);
        let length = rgba.length
        rgba = rgba.slice(0, length-1) + `, ${opacity})`
        return rgba
    }
    function getStyles(index) {
      let length = colors.length;
      return {
        backgroundColor: convertRGBtoRGBA(colors[index % length], 0.2),
        borderColor: colors[index % length],
        pointBackgroundColor: colors[index % length],
        pointHoverBorderColor: colors[index % length]
      }
    }
      let data = {
        labels: rawData.map((val,i)=>val['Capability']),
        
        datasets: comparisons.map((val,i)=>{
            return {
                label: val,
                data: rawData.map((row)=>row[val]),
                fill: true,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                ...getStyles(i)
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