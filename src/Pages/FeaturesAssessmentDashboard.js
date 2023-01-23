import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from '../Components/ComparisonForm';
import Header from '../Components/Header'
import TableHeader from '../Components/Table/TableHeader'
import { filterArray, downloadImagePDF, downloadTablePDF, getAllHeadings, filterAndDownloadExcel } from '../Utils/utils';
import rawData from '../Data/featuresDataRaw.json'
import TableRow from '../Components/Table/TableRow';
import TableBreak from '../Components/Table/TableBreak';

const FeaturesAssessmentDashboard = ({setActive}) => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('')

    const [allComparisons, setAllComparisons] = useState([])
    const [allHeadings, setAllHeadings] = useState([])
    const [currentHeadings, setCurrentHeadings] = useState([])
    const [sectionLengths, setSectionLengths] = useState({})
         
    useEffect(() => {
        let allHeadings = getAllHeadings(rawData)
        setAllHeadings(allHeadings)
        setAllComparisons(allHeadings.slice(2, 11))
        updateSectionLengths()
    }, [])

    function updateSectionLengths() {
        let sectionLengths = {}
        let currentSectionLength = 1;
        let i;
        for (i in rawData) {
            if (i === "0") continue;
            if (rawData[i]["Capability"] !== "") {
                sectionLengths[i - currentSectionLength] = currentSectionLength;
                currentSectionLength = 1;
            }
            else currentSectionLength++;
        }
        if (currentSectionLength !== 1) sectionLengths[i - currentSectionLength + 1] = currentSectionLength;
        setSectionLengths(sectionLengths);
    }

    useEffect(() => {
        setActive("Features")
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query !== null) {
            setQueryInBinary(query)
        }
        // eslint-disable-next-line
    }, [location])

    useEffect(()=>{
        setCurrentHeadings(filterArray(allHeadings, "11"+queryInBinary))
    }, [queryInBinary, allHeadings])
    
  return (
    <>
        <Header heading={"FEATURES ASSESSMENT - Market Leaders"} className='center'/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <div id='tableDiv'>
        <table id='table'>
            <TableHeader headings={["Capability", "Features", ...filterArray(allComparisons, queryInBinary)]}/>
            <tbody>
                {/* {Object.entries(allData).map((val, i)=>{
                    return <TablePartiton key={i} breakText={val[0]} dataObject={filterObject(val[1], queryInBinary)} firstRowSpan={true} mode={2}/>
                })} */}
                {rawData.map((val, i)=>{
                    /* return <TablePartiton key={i} breakText={val["Capability"]} dataObject={filterObject(val[1], queryInBinary)} firstRowSpan={true} mode={2}/> */
                    if (val["Capability"] !== "") return <Fragment key={i}>
                        <TableBreak breakText={val["Capability"]}/>
                        <TableRow mode={2} dataObject={val} headingsArray={currentHeadings} rowSpan={[sectionLengths[i]]}/>
                    </Fragment>
                    else return <TableRow mode={2} key={i} dataObject={val} headingsArray={currentHeadings}/>
                })}
            </tbody>
        </table>
        </div>
        <div className='controls'>
            <div className='left'>
                <Link to={`/capability-assessment-dashboard?q=${queryInBinary}`}><button className='prev'>Previous</button></Link>
            </div>
            <div>
                <button onClick={()=>downloadImagePDF()}>Download Image PDF</button>
                <button onClick={()=>downloadTablePDF()}>Download Table PDF</button>
                <button onClick={()=>filterAndDownloadExcel(rawData, allHeadings, "11"+queryInBinary, 'Features Assessment')}>Download Excel</button>
            </div>
            <div className='right'>
                <Link to={`/activities-assessment-dashboard?q=${queryInBinary}`}><button className='next'>Next</button></Link>
            </div>
        </div>
        </div>
    </>
  )
}

export default FeaturesAssessmentDashboard