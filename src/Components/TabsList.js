import React from 'react'

const TabsList = ({tabsList=[], activeTab='', setActiveTab}) => {
  return (
    <div>
        <ul id='tabsList'>
            {tabsList.map((value, i)=>{
                return <li key={i} className={activeTab === value ? 'active' : ''} onClick={()=>setActiveTab(value)}>
                    {value}
                </li>
            })}
        </ul>
    </div>
  )
}

export default TabsList