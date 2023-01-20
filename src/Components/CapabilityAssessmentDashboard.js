import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from './ComparisonForm';
import Header from './Header'
import TableHeader from './Table/TableHeader'
import TablePartiton from './Table/TablePartiton';
import { filterArray, filterObject, downloadImagePDF, downloadTablePDF, downloadActivitiesCSV } from '../Utils/utils';
import allData from '../capabilityData.json'

const CapabilityAssessmentDashboard = () => {
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
        <Header heading={"Capability Assessment"}/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <div id='tableDiv'>
        <table id='table'>
            <TableHeader headings={["CAPABILITY ASSESSMENT", ...filterArray(allComparisons, queryInBinary)]}/>
            <tbody>
                {Object.entries(allData).map((val, i)=>{
                    return <TablePartiton key={i} breakText={val[0]} dataObject={filterObject(val[1], queryInBinary)} mode={1}/>
                })}
            </tbody>
        </table>
        </div>
        <div className='controls'>
            <button onClick={()=>downloadImagePDF()}>Download Image PDF</button>
            <button onClick={()=>downloadTablePDF()}>Download Table PDF</button>
            <button onClick={()=>downloadActivitiesCSV(allData, allComparisons, queryInBinary)}>Download CSV</button>
            <Link to={`/feature-assessment-dashboard?q=${queryInBinary}`} className='next'><button>Next</button></Link>
        </div>
        </div>
    </>
  )
}

export default CapabilityAssessmentDashboard