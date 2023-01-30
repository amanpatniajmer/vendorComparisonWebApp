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
import BarChart from '../Components/BarChart';

const FeaturesAssessmentDashboard = ({setActive}) => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('')

    const [allComparisons, setAllComparisons] = useState([])
    const [allHeadings, setAllHeadings] = useState([])
    const [currentHeadings, setCurrentHeadings] = useState([])
    const [sectionLengths, setSectionLengths] = useState({})
    let tabsList = ['Radar Chart', 'Bar Chart', 'Table']
    const [tab, setTab] = useState(tabsList[0])
         
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
        let currentTotal = {}
        let numberOfData = 0
        for (let i in data) {
            if (data[i]["Capability"] !== "" && data[i]["Capability"]!== "TOTAL") {
                if (numberOfData !== 0) {
                    newData.push(divideRow(currentTotal, numberOfData))
                }
                currentTotal = data[i]
                numberOfData = 1;
            }
            else {
                currentTotal = addRowsData(currentTotal, data[i])
                numberOfData++;
            }
        }
        return newData;
    }

    function addRowsData (row1={}, row2={}) {
        let finalRow = {...row2, ...row1}
        console.log(finalRow)
        for (let key in row2){
            if(!Number.isNaN(Number(row2[key])) && row2[key] !== ""){
                finalRow[key] = Number(row1[key]) + Number(row2[key])
            }
        }
        return finalRow
    }

    function divideRow (row, number) {
        for (let key in row){
            if(!Number.isNaN(Number(row[key])) && row[key] !== ""){
                row[key] = Number(row[key]) / number
            }
        }
        return row
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
                                <TableBreak breakText="&nbsp;"/>
                                <TableRow mode={2} dataObject={val} headingsArray={currentHeadings} rowSpan={[sectionLengths[i]]}/>
                            </Fragment>
                            else return <TableRow mode={2} key={i} dataObject={val} headingsArray={currentHeadings}/>
                        })}
                    </tbody>
                </table>
                </div>
            case 'Radar Chart':
                return <RadarChart rawData={filterForChart(rawData)} comparisons = {filterArray(allComparisons, queryInBinary)}/>
            case 'Bar Chart':
                return <BarChart rawData={filterForChart(rawData)} comparisons = {filterArray(allComparisons, queryInBinary)}/>
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
    <div id = "Features">
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
    </div>
  )
}

export default FeaturesAssessmentDashboard