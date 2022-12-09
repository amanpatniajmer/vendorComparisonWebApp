import React from 'react'

const ComparisonForm = ({comparisonKeys=[]}) => {
  return (
    <div>
        
        <br/>
        <form id="comparisonForm">
            {comparisonKeys.map((key) => 
                <div key={key}>
                <input type='checkbox' id={key} value={key}/>
                <label htmlFor={key}>{key}</label>
                </div>
            )}
            
        </form>
    </div>
  )
}

export default ComparisonForm