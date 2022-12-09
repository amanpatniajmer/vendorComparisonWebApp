import React from 'react'
import ComparisonForm from './ComparisonForm';
import Header from './Header'
import TableHeader from './Table/TableHeader'
import TablePartiton from './Table/TablePartiton';

const CapabilityAssessmentDashboard = () => {
    let allComparisons = ["ASPECT","CXOne", "NICE", "Verint", "Calabrio", "Genesys Cloud", "AWS", "Salesforce WEM"];
    let comparisons = ["ASPECT", "AWS"]
    let WFMdata = {"Forecasting" : [25,30]};
    let integrationDeploymentData = {"Integration with 3rd Party tools" : [25,30]};
    let webPortalData = {"User Friendliness of Web Portal" : [25,30]};

    
  return (
    <>
        <Header heading={"Capability Assessment"}/>
        <ComparisonForm comparisonKeys={allComparisons}/>
        <div className='dashboard'>
        <table>
            <TableHeader headings={["CAPABILITY ASSESSMENT", ...comparisons]}/>
            <tbody>
                <TablePartiton breakText = {"WFM Capabilities"} dataArray = {WFMdata}/>
                <TablePartiton breakText = {"Integration & Deployment"} dataArray = {integrationDeploymentData}/>
                <TablePartiton breakText = {'Web Portal & Employment Self-Service'} dataArray = {webPortalData}/>
            </tbody>
        </table>
        <button>Next</button>
        </div>
    </>
  )
}

export default CapabilityAssessmentDashboard