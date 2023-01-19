import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ComparisonForm from './ComparisonForm';
import Header from './Header'
import TableHeader from './Table/TableHeader'
import TablePartiton from './Table/TablePartiton';
import { filterArray, filterObject } from '../Utils/utils';


const CapabilityAssessmentDashboard = () => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('00000000')

    let allComparisons = ["ASPECT","CXOne", "NICE", "Verint", "Calabrio", "Genesys Cloud", "AWS", "Playvox"];
    let WFMdata = {"Forecasting" : [25,30, 1,2,3,4,5,6], "Capacity Planning" : [25,30, 1,2,3,4,5,6], "Scheduling" : [25,30, 1,2,3,4,5,6], "Scenario Modelling" : [25,30, 1,2,3,4,5,6], "Real-time Management" : [25,30, 1,2,3,4,5,6],};
    let integrationDeploymentData = {"Integration with 3rd Party tools" : [25,30,1,2,3,4,5,6], "Ease of Deployment" : [25,30,1,2,3,4,5,6]};
    let webPortalData = {"User Friendliness of Web Portal" : [25,30,1,2,3,4,5,6], "Employee Self Service options" : [25,30,1,2,3,4,5,6]};
    let AIcapabilityData = {"AI based Forecasting" : [25,30,1,2,3,4,5,6]};
    let AIschedulingData = {"Skill use Assessment Intelligence" : [25,30,1,2,3,4,5,6], "Schedule Efficiency" : [25,30,1,2,3,4,5,6]};
    let trainingData = {"Self-paced Training modules" : [25,30,1,2,3,4,5,6], "Instructor-led Training" : [25,30,1,2,3,4,5,6]};
    let AQMData = {"Automated QM Scoring" : [25,30,1,2,3,4,5,6]};

    useEffect(() => {
        const { search } = location;
        let query = new URLSearchParams(search).get('q');
        if (query != null) {
            setQueryInBinary(query)
        }
    }, [location])
    
    
  return (
    <>
        <Header heading={"Capability Assessment"}/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <table>
            <TableHeader headings={["CAPABILITY ASSESSMENT", ...filterArray(allComparisons, queryInBinary)]}/>
            <tbody>
                <TablePartiton breakText = {"WFM Capabilities"} dataObject = {filterObject(WFMdata, queryInBinary)} mode={1}/>
                <TablePartiton breakText = {"Integration & Deployment"} dataObject = {filterObject(integrationDeploymentData, queryInBinary)}/>
                <TablePartiton breakText = {'Web Portal & Employment Self-Service'} dataObject = {filterObject(webPortalData, queryInBinary)}/>
                <TablePartiton breakText = {'AI Capabilities'} dataObject = {filterObject(AIcapabilityData, queryInBinary)}/>
                <TablePartiton breakText = {'AI based Scheduling'} dataObject = {filterObject(AIschedulingData, queryInBinary)}/>
                <TablePartiton breakText = {'Training Services'} dataObject = {filterObject(trainingData, queryInBinary)}/>
                <TablePartiton breakText = {'Automated Quality Management'} dataObject = {filterObject(AQMData, queryInBinary)}/>
            </tbody>
        </table>
        <Link to={`/feature-assessment-dashboard?q=${queryInBinary}`}><button>Next</button></Link>
        </div>
    </>
  )
}

export default CapabilityAssessmentDashboard