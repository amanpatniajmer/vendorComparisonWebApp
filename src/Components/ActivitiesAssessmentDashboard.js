import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from './ComparisonForm';
import Header from './Header';
import TableHeader from './Table/TableHeader';
import TablePartiton from './Table/TablePartiton';
import { filterArray, filterObject } from '../Utils/utils';

const ActivitiesAssessmentDashboard = () => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('00000000')

    let allComparisons = ["ASPECT","CXOne", "NICE", "Verint", "Calabrio", "Genesys Cloud", "AWS", "Salesforce WEM"];
    let WFMdata = {"Forecasting" : [25,30, 1,2,3,4,5,6], "Capacity Planning" : [25,30, 1,2,3,4,5,6]};
    let integrationDeploymentData = {"Integration with 3rd Party tools" : [25,30,1,2,3,4,5,6], "Ease of Deployment" : [25,30,1,2,3,4,5,6]};
    let webPortalData = {"User Friendliness of Web Portal" : [25,30,1,2,3,4,5,6], "Employee Self Service options" : [25,30,1,2,3,4,5,6]};

    useEffect(() => {
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query != null) {
            setQueryInBinary(query)
        }
    }, [location])
    
    
  return (
    <>
        <Header heading={"Activities Assessment"}/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <table>
            <TableHeader headings={["CAPABILITY ASSESSMENT", ...filterArray(allComparisons, queryInBinary)]}/>
            <tbody>
                <TablePartiton breakText = {"WFM Capabilities"} dataObject = {filterObject(WFMdata, queryInBinary)}/>
                <TablePartiton breakText = {"Integration & Deployment"} dataObject = {filterObject(integrationDeploymentData, queryInBinary)}/>
                <TablePartiton breakText = {'Web Portal & Employment Self-Service'} dataObject = {filterObject(webPortalData, queryInBinary)}/>
            </tbody>
        </table>
        <Link to={`/feature-assessment-dashboard?q=${queryInBinary}`}><button>Next</button></Link>
        </div>
    </>
  )
}

export default ActivitiesAssessmentDashboard