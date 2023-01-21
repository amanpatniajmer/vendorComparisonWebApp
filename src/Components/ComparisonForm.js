import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { equalizeQueryString } from '../Utils/utils';

const ComparisonForm = ({comparisonKeys=[]}) => {
    let location = useLocation();
    let length = comparisonKeys.length;
    const [queryInBinary, setQueryInBinary] = useState('0'.repeat(length))
    let navigate = useNavigate();
    const [selectAll, setSelectAll] = useState(false);

    function invertIndex(i) {
        let newQuery = queryInBinary;
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
        // setting selectAll state to false when any of the checkbox is unchecked
        setSelectAll(false);
    }

    // function to handle Select All checkbox
    function handleSelectAll(e) {
        let newQuery = queryInBinary;        
        if (e.target.checked) {
            newQuery = newQuery.replace(/0/g, '1');
            setSelectAll(true);
        } else {
            newQuery = newQuery.replace(/1/g, '0');
            setSelectAll(false);
        }
        setQueryInBinary(newQuery);
        navigate(window.location.pathname + "?q=" + newQuery);
    }

    useEffect(() => {
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query != null) {
            setQueryInBinary(query)
        }
    }, [location])

    useEffect(()=>{
        let newQuery = equalizeQueryString(queryInBinary, comparisonKeys.length)
        if (queryInBinary !== newQuery) navigate(window.location.pathname + "?q=" + newQuery);
        //eslint-disable-next-line
    }, [location, comparisonKeys, queryInBinary])

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
            <div>
                <input onChange={handleSelectAll} type='checkbox' id={'selectAll'} value={'selectAll'} checked={selectAll}/>
                <label htmlFor={'selectAll'}>Select All</label>
            </div>
        </form>
    </div>
  )
}
export default ComparisonForm
