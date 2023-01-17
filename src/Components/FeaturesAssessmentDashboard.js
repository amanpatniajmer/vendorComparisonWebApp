import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from './ComparisonForm';
import Header from './Header'
import TableHeader from './Table/TableHeader'
import TablePartiton from './Table/TablePartiton';
import { filterArray, filterObject } from '../Utils/utils';

const FeaturesAssessmentDashboard = () => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('00000000')

    let forecastingData = {"Personal Planner" : [25,30, 1,2,3,4,5,6], "Multi-Step Workflow" : [25,30, 1,2,3,4,5,6], "Adjust intra-day forecast" : [25,30, 1,2,3,4,5,6]}

    let allComparisons = ["ASPECT","CXOne", "NICE", "Verint", "Calabrio", "Genesys Cloud", "AWS", "Salesforce WEM"];
    let schedulingData = {"Schedule Viewer Preference" : [25,30, 1,2,3,4,5,6], "Schedule Trades" : [25,30, 1,2,3,4,5,6]};
    let agentWebData = {"Stats Viewer" : [25,30,1,2,3,4,5,6], "Stats Viewer Configuration" : [25,30,1,2,3,4,5,6]};
    let reportsData = {"Queue Level" : [25,30,1,2,3,4,5,6], "YTD" : [25,30,1,2,3,4,5,6]};

    let allData = {"Forecasting" : forecastingData, "Scheduling" :  schedulingData,
"Agent Web Solution" : agentWebData, "Reports" :  reportsData};

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