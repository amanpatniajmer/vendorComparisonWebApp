import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ComparisonForm from './ComparisonForm';
import Header from './Header'
import TableHeader from './Table/TableHeader'
import TablePartiton from './Table/TablePartiton';

const CapabilityAssessmentDashboard = () => {
    let location = useLocation();
    const [queryInBinary, setQueryInBinary] = useState('00000000')


    function filterArray(data) {
        return data.filter((val, i) => queryInBinary[i]==='1')
    }

    function filterObject(data) {
        for (const key in data) {
            data[key] = filterArray(data[key])
        }
        return data;
    }


    let allComparisons = ["ASPECT","CXOne", "NICE", "Verint", "Calabrio", "Genesys Cloud", "AWS", "Salesforce WEM"];
    let WFMdata = {"Forecasting" : [25,30, 1,2,3,4,5,6]};
    let integrationDeploymentData = {"Integration with 3rd Party tools" : [25,30,1,2,3,4,5,6]};
    let webPortalData = {"User Friendliness of Web Portal" : [25,30,1,2,3,4,5,6]};

    useEffect(() => {
        const { search } = location;
        let query = new URLSearchParams(search);
        setQueryInBinary(query.get('q'))
    }, [location])
    
    
  return (
    <>
        <Header heading={"Capability Assessment"}/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <table>
            <TableHeader headings={["CAPABILITY ASSESSMENT", ...filterArray(allComparisons)]}/>
            <tbody>
                <TablePartiton breakText = {"WFM Capabilities"} dataArray = {filterObject(WFMdata)}/>
                <TablePartiton breakText = {"Integration & Deployment"} dataArray = {filterObject(integrationDeploymentData)}/>
                <TablePartiton breakText = {'Web Portal & Employment Self-Service'} dataArray = {filterObject(webPortalData)}/>
            </tbody>
        </table>
        <button>Next</button>
        </div>
    </>
  )
}

export default CapabilityAssessmentDashboard