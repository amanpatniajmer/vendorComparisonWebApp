import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from '../Components/ComparisonForm';
import Header from '../Components/Header'
import TableHeader from '../Components/Table/TableHeader'
import { filterArray, downloadImagePDF, downloadTablePDF, getAllHeadings, filterAndDownloadExcel } from '../Utils/utils';
import rawData from '../Data/capabilitiesDataRaw.json'
import TableRow from '../Components/Table/TableRow';
import TableBreak from '../Components/Table/TableBreak';
import legend from '../images/legend.png'

const CapabilityAssessmentDashboard = ({setActive}) => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('')
    const [allComparisons, setAllComparisons] = useState([])
    const [allHeadings, setAllHeadings] = useState([])
    const [currentHeadings, setCurrentHeadings] = useState([])

    useEffect(() => {
        let allHeadings = getAllHeadings(rawData)
        setAllHeadings(allHeadings)
        setAllComparisons(allHeadings.slice(2, 11))
    }, [])

    useEffect(() => {
        setActive("Capabilities")
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query != null) {
            setQueryInBinary(query)
        }
        // eslint-disable-next-line
    }, [location])
    
    useEffect(()=>{
        setCurrentHeadings(filterArray(allHeadings, "01"+queryInBinary))
    }, [queryInBinary, allHeadings])
    
  return (
    <div id="capability">
        <Header heading={"Capability Assessment"} className='center'/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <img src={legend} id='legend'/>
        <div id='tableDiv'>
        <table id='table'>
            <TableHeader headings={["CAPABILITY ASSESSMENT", ...filterArray(allComparisons, queryInBinary)]}/>
            <tbody>
                {rawData.map((val, i)=>{
                    if (val["Capability"] !== ""){
                        return <Fragment key={i}>
                        <TableBreak breakText={val["Capability"]}/>
                        <TableRow dataObject={val} headingsArray={currentHeadings} mode={1}/>
                        </Fragment>
                    }
                    else 
                    return <TableRow key={i} dataObject={val} headingsArray={currentHeadings} mode={1}/>
                })}
            </tbody>
        </table>
        </div>
        <div className='controls'>
            <div className='left'>
            </div>
            <div>
                <button onClick={()=>downloadImagePDF()}>Download Image PDF</button>
                <button onClick={()=>downloadTablePDF()}>Download Table PDF</button>
                <button onClick={()=>filterAndDownloadExcel(rawData, allHeadings, "11"+queryInBinary, 'Capability Assessment')}>Download Excel</button>
            </div>
            <div className='right'>
                <Link to={`/feature-assessment-dashboard?q=${queryInBinary}`}><button className='next'>Next</button></Link>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CapabilityAssessmentDashboard