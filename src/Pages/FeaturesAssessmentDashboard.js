import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from '../Components/ComparisonForm';
import Header from '../Components/Header'
import TableHeader from '../Components/Table/TableHeader'
import { filterArray, downloadImagePDF, downloadTablePDF, getAllHeadings, filterAndDownloadExcel } from '../Utils/utils';
import rawData from '../Data/featuresDataRaw.json'
import TableRow from '../Components/Table/TableRow';
import TableBreak from '../Components/Table/TableBreak';
import TabsList from '../Components/TabsList';
import RadarChart from '../Components/RadarChart';

const FeaturesAssessmentDashboard = ({setActive}) => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('')

    const [allComparisons, setAllComparisons] = useState([])
    const [allHeadings, setAllHeadings] = useState([])
    const [currentHeadings, setCurrentHeadings] = useState([])
    const [sectionLengths, setSectionLengths] = useState({})
    let tabsList = ['Table', 'Radar Chart', 'Bar Chart']
    const [tab, setTab] = useState(tabsList[1])
         
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

    function filterForChart(data){
        let newData = []
        for (let i in data) {
            if (data[i]["Capability"] !== "" && data[i]["Capability"]!== "TOTAL") {
                newData.push(data[i])
            }
        }
        return newData;
    }

    function renderTab(activeTab){
        switch (activeTab) {
            case 'Table':
                return <div id='tableDiv'>
                <table id='table'>
                    <TableHeader headings={["Capability", "Features", ...filterArray(allComparisons, queryInBinary)]}/>
                    <tbody>
                        {rawData.map((val, i)=>{
                            if (val["Capability"] !== "") return <Fragment key={i}>
                                <TableBreak breakText={val["Capability"]}/>
                                <TableRow mode={2} dataObject={val} headingsArray={currentHeadings} rowSpan={[sectionLengths[i]]}/>
                            </Fragment>
                            else return <TableRow mode={2} key={i} dataObject={val} headingsArray={currentHeadings}/>
                        })}
                    </tbody>
                </table>
                </div>
            case 'Radar Chart':
                return <RadarChart rawData={filterForChart(rawData)} comparisons = {filterArray(currentHeadings, "00"+queryInBinary)}/>
            default:
                break;
        }
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
        <TabsList tabsList={tabsList} activeTab={tab} setActiveTab={setTab}/>
        <div id='tab'>
            {renderTab(tab)}
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