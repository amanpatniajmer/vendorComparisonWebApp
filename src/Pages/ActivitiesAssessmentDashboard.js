import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from '../Components/ComparisonForm';
import Header from '../Components/Header';
import TableHeader from '../Components/Table/TableHeader';
import { filterArray, downloadImagePDF, downloadTablePDF, getAllHeadings, downloadAllExcel, filterAndDownloadExcel } from '../Utils/utils';
import TableRow from '../Components/Table/TableRow'
import rawData from '../Data/activitiesDataRaw.json'
import capabilitiesData from '../Data/capabilitiesDataRaw.json'
import featuresData from '../Data/featuresDataRaw.json'
import TabsList from '../Components/TabsList';
import PolarChart from '../Components/PolarChart';
import TableBreak from '../Components/Table/TableBreak';

const ActivitiesAssessmentDashboard = ({setActive}) => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('')
    const [allComparisons, setAllComparisons] = useState([])
    const [allHeadings, setAllHeadings] = useState([])
    const [currentHeadings, setCurrentHeadings] = useState([])
    let tabsList = ['Polar Area Chart', 'Table']
    const [tab, setTab] = useState(tabsList[0])

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
    
    function getMergedHeadings() {
        let data = [capabilitiesData, featuresData, rawData]
        let headings = new Set();
        for (let i in data) {
            let curr = getAllHeadings(data[i]);
            curr = filterArray(curr, "11"+queryInBinary+"1")
            for (let x in curr) {
                headings.add(curr[x])
            }
        }
        return Array.from(headings)
    }

    function filterForChart(data=[]){
        let length = data.length;
        return data[length-1];
    }

    function renderTab(activeTab) {
        switch (activeTab) {
            case 'Table':
                return <div id="tableDiv">
                <table id="table">
                    <TableHeader headings={filterArray(allHeadings, "11"+queryInBinary+"0")}/>
                    <tbody>
                        {rawData.map((val,i)=>{
                            if(i == rawData.length - 3 && val !== null) {
                                return <Fragment key={i}>
                                <TableBreak breakText="&nbsp;"/>
                                <TableRow key={i} dataObject={val} headingsArray={currentHeadings} mode={3}/>
                                </Fragment>
                            }
                            else if(i > rawData.length - 3 && val !== null) {
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
            
            case 'Polar Area Chart':
                return <PolarChart rawData={filterForChart(rawData)} comparisons = {filterArray(allComparisons, queryInBinary)} heading={'Percentage of "Yes"'}/>
        }
    }
  return (
    <div id="activities">
        <Header heading={"Activities Assessment"} className='center'/>
        <div className='subheading'>Based on the features within each of the capabilities we also bring the comparison at an activity level.</div>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <TabsList tabsList={tabsList} activeTab={tab} setActiveTab={setTab}/>
        <div id='tab'>
            {renderTab(tab)}
        </div>
        <div className='controls'>
            <div>
                <Link to={`/feature-assessment-dashboard?q=${queryInBinary}`}><button className='prev'>Previous</button></Link>
            </div>
            <div>
                <button onClick={()=>downloadImagePDF()}>Download Image PDF</button>
                <button onClick={()=>downloadTablePDF()}>Download Table PDF</button>
                <button onClick={()=>filterAndDownloadExcel(rawData, allHeadings, "11"+queryInBinary+"1", 'Activities Assessment')}>Download Excel</button>
                <button className='success' onClick={()=>downloadAllExcel([capabilitiesData, featuresData, rawData], getMergedHeadings())}>Download All Excel</button>
            </div>
            <div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ActivitiesAssessmentDashboard