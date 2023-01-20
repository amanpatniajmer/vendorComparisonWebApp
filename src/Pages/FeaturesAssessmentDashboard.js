import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from '../Components/ComparisonForm';
import Header from '../Components/Header'
import TableHeader from '../Components/Table/TableHeader'
import TablePartiton from '../Components/Table/TablePartiton';
import { downloadFeaturesCSV, filterArray, filterObject, downloadImagePDF, downloadTablePDF } from '../Utils/utils';
import allData from '../featuresData.json'

const FeaturesAssessmentDashboard = ({setActive}) => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('00000000')

    let allComparisons = ["ASPECT","CXOne", "NICE", "Verint", "Calabrio", "Genesys Cloud", "AWS", "Playvox"];
         
    useEffect(() => {
        setActive("Features")
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query != null) {
            setQueryInBinary(query)
        }
        // eslint-disable-next-line
    }, [location])
    
  return (
    <>
        <Header heading={"FEATURES ASSESSMENT - Market Leaders"} className='center'/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <div id='tableDiv'>
        <table id='table'>
            <TableHeader headings={["Capability", "Features", ...filterArray(allComparisons, queryInBinary)]}/>
            <tbody>
                {Object.entries(allData).map((val, i)=>{
                    return <TablePartiton key={i} breakText={val[0]} dataObject={filterObject(val[1], queryInBinary)} firstRowSpan={true} mode={2}/>
                })}
            </tbody>
        </table>
        </div>
        <div className='controls'>
            <div className='left'>
                <Link to={`/capability-assessment-dashboard?q=${queryInBinary}`}><button className='prev'>Previous</button></Link>
            </div>
            <div className='right'>
                <button onClick={()=>downloadImagePDF()}>Download Image PDF</button>
                <button onClick={()=>downloadTablePDF()}>Download Table PDF</button>
                <button onClick={()=>downloadFeaturesCSV(allData, allComparisons, queryInBinary)}>Download CSV</button>
                <Link to={`/activities-assessment-dashboard?q=${queryInBinary}`}><button className='next'>Next</button></Link>
            </div>
        </div>
        </div>
    </>
  )
}

export default FeaturesAssessmentDashboard