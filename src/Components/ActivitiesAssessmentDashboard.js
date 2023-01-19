import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from './ComparisonForm';
import Header from './Header';
import TableHeader from './Table/TableHeader';
import TablePartiton from './Table/TablePartiton';
import { filterArray, filterObject } from '../Utils/utils';
import allData from '../activitiesData.json'
import TableRow from './Table/TableRow';

const ActivitiesAssessmentDashboard = () => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('00000000')

    let allComparisons = ["ASPECT","CXOne", "NICE", "Verint", "Calabrio", "Genesys Cloud", "AWS", "Salesforce WEM"];

    useEffect(() => {
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query != null) {
            setQueryInBinary(query)
        }
    }, [location])
    
    
  return (
    <>
        <Header heading={"Activities Assessment"}/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <table>
            <TableHeader headings={["S.No.", "Activities", ...filterArray(allComparisons, queryInBinary)]}/>
            <tbody>
                {/* <TableRow dataArray={filterArray(allData[1], "11"+queryInBinary)}/> */}
                {allData.map((val, i)=>{
                    return <TableRow key={i} breakText={val} dataArray={filterArray(val, "11"+queryInBinary)} firstRowSpan={true} mode={3}/>
                })}
            </tbody>
        </table>
        <Link to={`/feature-assessment-dashboard?q=${queryInBinary}`}><button>Next</button></Link>
        </div>
    </>
  )
}

export default ActivitiesAssessmentDashboard