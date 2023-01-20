import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from '../Components/ComparisonForm';
import Header from '../Components/Header';
import TableHeader from '../Components/Table/TableHeader';
import { filterArray, downloadImagePDF, downloadTablePDF, downloadActivitiesCSV } from '../Utils/utils';
import allData from '../activitiesData.json'
import TableRow from '../Components/Table/TableRow'

const ActivitiesAssessmentDashboard = ({setActive}) => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('00000000')

    let allComparisons = ["ASPECT","CXOne", "NICE", "Verint", "Calabrio", "Genesys Cloud", "AWS", "Salesforce WEM"];

    useEffect(() => {
        setActive("Activities")
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query != null) {
            setQueryInBinary(query)
        }
        // eslint-disable-next-line
    }, [location])

    
    
  return (
    <>
        <Header heading={"Activities Assessment"}/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
            <div id="tableDiv">
            <table id="table">
                <TableHeader headings={["S.No.", "Activities", ...filterArray(allComparisons, queryInBinary)]}/>
                <tbody>
                    {/* <TableRow dataArray={filterArray(allData[1], "11"+queryInBinary)}/> */}
                    {allData.map((val, i)=>{
                        return <TableRow key={i} breakText={val} dataArray={filterArray(val, "11"+queryInBinary)} firstRowSpan={true} mode={3}/>
                    })}
                </tbody>
            </table>
        </div>
        <div className='controls'>
            <button onClick={()=>downloadImagePDF()}>Download Image PDF</button>
            <button onClick={()=>downloadTablePDF()}>Download Table PDF</button>
            <button onClick={()=>downloadActivitiesCSV(allData, allComparisons, queryInBinary)}>Download CSV</button>
            <Link to={`/feature-assessment-dashboard?q=${queryInBinary}`} className='prev'><button>Previous</button></Link>
        </div>
        </div>
    </>
  )
}

export default ActivitiesAssessmentDashboard