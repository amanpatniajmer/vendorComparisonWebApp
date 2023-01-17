import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ComparisonForm = ({comparisonKeys=[]}) => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('00000000')
    let navigate = useNavigate();

    function invertIndex(i) {
        let trail="";
        for (let p=queryInBinary.length;p<8;p++){
            trail+="0"
        }
        let newQuery = queryInBinary + trail;
        let start = newQuery.slice(0,i);
        let end = newQuery.slice(i+1);
        if (newQuery.at(i) === '1') {
            newQuery = start + '0' + end;
            setQueryInBinary(newQuery)
            navigate(window.location.pathname + "?q=" + newQuery)
        }
        else {
            newQuery = start + '1' + end;
            setQueryInBinary(start + '1' + end);
            navigate(window.location.pathname + "?q=" + newQuery);
        }
    }

    useEffect(() => {
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query != null) {
            setQueryInBinary(query)
        }
    }, [location])

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