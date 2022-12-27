import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ComparisonForm = ({comparisonKeys=[]}) => {
    const { search } = useLocation();
    let query = new URLSearchParams(search);
    const [queryInBinary, setQueryInBinary] = useState(query.get('q'))
    let navigate = useNavigate();

    function invertIndex(i) {
        let start = queryInBinary.slice(0,i);
        let end = queryInBinary.slice(i+1);
        if (queryInBinary.at(i) === '1') {
            let newQuery = start + '0' + end;
            setQueryInBinary(newQuery)
            navigate(window.location.pathname + "?q=" + newQuery)
        }
        else {
            let newQuery = start + '1' + end;
            setQueryInBinary(start + '1' + end);
            navigate(window.location.pathname + "?q=" + newQuery);
        }
    }

    

  return (
    <div>
        
        <br/>
        <form id="comparisonForm">
            {comparisonKeys.map((key, i) => 
                <div key={key}>
                <input onChange={()=> {invertIndex(i)}} type='checkbox' id={key} value={key} checked={queryInBinary[i]==='1'}/>
                <label htmlFor={key}>{key}</label>
                </div>
            )}
            
        </form>
    </div>
  )
}

export default ComparisonForm