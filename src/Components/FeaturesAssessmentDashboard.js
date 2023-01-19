import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from './ComparisonForm';
import Header from './Header'
import TableHeader from './Table/TableHeader'
import TablePartiton from './Table/TablePartiton';
import { filterArray, filterObject } from '../Utils/utils';
import allData from '../featuresData.json'

const FeaturesAssessmentDashboard = () => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('00000000')

    let allComparisons = ["ASPECT","CXOne", "NICE", "Verint", "Calabrio", "Genesys Cloud", "AWS", "Playvox"];
         
    useEffect(() => {
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query != null) {
            setQueryInBinary(query)
        }
    }, [location])
    
  return (
    <>
        <Header heading={"FEATURES ASSESSMENT - Market Leaders"}/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <table>
            <TableHeader headings={["Capability", "Features", ...filterArray(allComparisons, queryInBinary)]}/>
            <tbody>
                {Object.entries(allData).map((val, i)=>{
                    return <TablePartiton key={i} breakText={val[0]} dataObject={filterObject(val[1], queryInBinary)} firstRowSpan={true}/>
                })}
            </tbody>
        </table>
        <Link to={`/activities-assessment-dashboard?q=${queryInBinary}`}><button>Next</button></Link>
        </div>
    </>
  )
}

export default FeaturesAssessmentDashboard