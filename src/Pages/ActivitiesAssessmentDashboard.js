import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from '../Components/ComparisonForm';
import Header from '../Components/Header';
import TableHeader from '../Components/Table/TableHeader';
import { filterArray, downloadImagePDF, downloadTablePDF, downloadActivitiesExcel, getAllHeadings } from '../Utils/utils';
import TableRow from '../Components/Table/TableRow'
import rawData from '../Data/activitiesDataRaw.json'

const ActivitiesAssessmentDashboard = ({setActive}) => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('')
    const [allComparisons, setAllComparisons] = useState([])
    const [allHeadings, setAllHeadings] = useState([])
    const [currentHeadings, setCurrentHeadings] = useState([])

    useEffect(() => {
        let allHeadings = getAllHeadings(rawData)
        setAllHeadings(allHeadings)
        setAllComparisons(allHeadings.slice(2, 10))
    }, [])

    useEffect(() => {
        setActive("Activities")
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query !== null) {
            setQueryInBinary(query)
        }
        //eslint-disable-next-line
    }, [location])
    
    useEffect(()=>{
        setCurrentHeadings(filterArray(allHeadings, "11"+queryInBinary+"0"))
    }, [queryInBinary, allHeadings])
    
    
  return (
    <>
        <Header heading={"Activities Assessment"} className='center'/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
            <div id="tableDiv">
            <table id="table">
                <TableHeader headings={filterArray(allHeadings, "11"+queryInBinary+"0")}/>
                <tbody>
                    {rawData.map((val,i)=>{
                        if(i >= rawData.length - 3 && val !== null) {
                            return <TableRow key={i} dataObject={val} headingsArray={currentHeadings} mode={3}/>
                        }
                        else if(val !== null) {
                            return <TableRow key={i} dataObject={val} headingsArray={currentHeadings} mode={3}/>
                        }
                        else return ''
                    })}
                </tbody>
            </table>
        </div>
        <div className='controls'>
            <div>
                <Link to={`/feature-assessment-dashboard?q=${queryInBinary}`}><button className='prev'>Previous</button></Link>
            </div>
            <div>
                <button onClick={()=>downloadImagePDF()}>Download Image PDF</button>
                <button onClick={()=>downloadTablePDF()}>Download Table PDF</button>
                <button onClick={()=>downloadActivitiesExcel(rawData, allHeadings, queryInBinary)}>Download Excel</button>
            </div>
            <div>
            </div>
        </div>
        </div>
    </>
  )
}

export default ActivitiesAssessmentDashboard